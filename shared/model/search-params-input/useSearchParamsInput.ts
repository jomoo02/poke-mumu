'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type CompositionEvent,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface UseSearchParamsInputOptions {
  /** URL 쿼리 키. */
  key?: string;
  /** 타이핑 → URL 반영 지연(ms). 0이면 즉시 반영한다. */
  debounceMs?: number;
  /**
   * 커밋할 때 함께 지울 키. 검색이 바뀌면 페이지를 1로 되돌리는 용도.
   * 예: ['page']
   */
  resetKeys?: string[];
  /**
   * 손을 떼지 않고 계속 입력해도 이 간격마다 최소 한 번은 URL에 반영한다.
   * debounceMs가 0보다 클 때만 의미가 있다.
   */
  maxWaitMs?: number;
}

/**
 * 텍스트 입력을 URL 쿼리 파라미터에 묶는다. 도메인을 모르는 범용 훅.
 *
 * - `value`는 로컬 state다. 키 입력과 동기적으로 갱신되므로 제어 입력이어도
 *   React가 IME 조합(한글·일본어)에 개입하지 않는다. URL 값을 그대로 `value`로
 *   쓰면 라우터 왕복이 비동기라 조합 중 값이 덮어써져 `ㄱㅏㄴㅏ`처럼 깨진다.
 *   대신 URL이 밖에서 바뀌면(재진입·뒤로가기) effect로 입력창을 URL에 맞춘다.
 * - `deferredValue`는 디바운스를 쓰면서도 URL을 기다리지 않고 즉시 필터링하려는
 *   소비처를 위한 것이다. URL을 읽어 거르는 곳에서는 쓸 필요가 없다.
 * - `clear`는 대기 중인 타이머를 취소하고 즉시 URL을 쓴다. 리셋을 디바운스에
 *   위임하면 모바일 백그라운드 스로틀링이나 타이머 기아로 URL에 반영되지 않는다.
 *
 * 쿼리가 비면 pathname만 남긴다(`?` 꼬리를 붙이지 않는다).
 * 캐시 컴포넌트에서 첫 진입 경로와 문자열이 정확히 같아야 하기 때문이다.
 */
export function useSearchParamsInput({
  key = 'search',
  debounceMs = 0,
  resetKeys = [],
  maxWaitMs,
}: UseSearchParamsInputOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlValue = searchParams.get(key) ?? '';

  const [value, setValue] = useState(urlValue);

  const deferredValue = useDeferredValue(value);

  // '내가' 마지막으로 URL에 쓴 값. 아래 URL→입력창 동기화에서 내 쓰기와
  // 외부 변경(다른 페이지에서 재진입, 뒤로/앞으로 가기)을 구분하는 용도.
  const lastSyncedRef = useRef(urlValue);

  // useCallback으로 감싸지 않는다. useDebouncedCallback이 매 렌더마다 최신 함수를
  // 내부 ref에 갱신해두고 타이머 만료 시 그것을 호출하므로, 이 클로저의
  // searchParams는 항상 최신이다(낡은 스냅샷으로 다른 파라미터를 덮어쓰지 않는다).
  const commit = (next: string) => {
    lastSyncedRef.current = next;

    const params = new URLSearchParams(searchParams.toString());

    if (next) {
      params.set(key, next);
    } else {
      params.delete(key);
    }

    resetKeys.forEach((resetKey) => params.delete(resetKey));

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  // flushOnExit: 탭이 백그라운드로 갈 때 대기 중인 커밋을 강제 실행한다.
  // 모바일에서 페이지를 벗어나 입력이 URL에 반영되지 않는 것을 막는다.
  const debouncedCommit = useDebouncedCallback(
    commit,
    debounceMs,
    maxWaitMs != null
      ? { maxWait: maxWaitMs, flushOnExit: true }
      : { flushOnExit: true },
  );

  const commitValue = (next: string) => {
    if (debounceMs <= 0) {
      commit(next);
      return;
    }

    debouncedCommit(next);
  };

  // 한글 호환 자모(ㄱ~ㆎ)로 끝나면 아직 음절이 완성되지 않은 중간 상태다.
  // '맹ㅎ'처럼 낱자로 끝나는 값은 어떤 이름과도 일치하지 않아 결과가 0건이 되고,
  // 목록이 비었다 다시 차면서 깜빡인다.
  //
  // 'IME 조합 중인지'로 판단하지 않는 이유: 한글 IME는 다음 글자가 들어와야
  // 조합이 끝난다. '맹'은 ㅇ이 받침일지 다음 글자 초성일지 미정이라 여전히 조합
  // 중이지만, 이미 완성된 음절이므로 검색되어야 한다.
  //
  // NFD(U+1100~U+11FF)는 제외한다. macOS에서 붙여넣은 자모 분리형 텍스트는
  // 낱자로 끝나지만 유효한 검색어다.
  const ENDS_WITH_INCOMPLETE_JAMO = /[ㄱ-ㆎ]$/;

  const onChange = (next: string) => {
    // 표시값은 항상 갱신해야 조합 중인 글자가 입력창에 보인다.
    setValue(next);

    if (ENDS_WITH_INCOMPLETE_JAMO.test(next)) {
      return;
    }

    commitValue(next);
  };

  // 조합이 끝났으면 낱자로 끝나더라도 반영한다.
  // (ㅁ만 입력하고 포커스를 옮기는 경우처럼 표시값과 URL이 어긋나는 걸 막는다)
  const onCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    const next = event.currentTarget.value;

    setValue(next);
    commitValue(next);
  };

  const clear = () => {
    debouncedCommit.cancel();
    setValue('');
    commit('');
  };

  // URL → 입력창 동기화. 밖에서 URL이 바뀐 경우에만 입력창을 맞춘다.
  // - 캐시 컴포넌트 + 레이아웃 공유 탓에 다른 페이지에서 재진입해도 컴포넌트가
  //   리마운트되지 않아, useState 초기값이 다시 읽히지 않는다. 그래서 '갈'을 검색한
  //   뒤 다른 페이지를 거쳐 /ability로 오면(URL은 비었는데) 입력창에 '갈'이 남았다.
  // - 내가 타이핑해서 바꾼 경우는 commit이 lastSyncedRef를 미리 갱신하므로 여기서
  //   되받지 않는다(입력·조합을 방해하지 않는다). 리셋도 commit('')을 거쳐 동일하다.
  useEffect(() => {
    if (urlValue !== lastSyncedRef.current) {
      lastSyncedRef.current = urlValue;
      setValue(urlValue);
    }
  }, [urlValue]);

  return {
    value,
    deferredValue,
    onChange,
    onCompositionEnd,
    clear,
  };
}

export type { UseSearchParamsInputOptions };
