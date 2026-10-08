'use client';

import { useEffect, useRef, useState, type CompositionEvent } from 'react';

import { endsWithIncompleteJamo } from './search-input';

interface UseSearchInputOptions {
  // 반영된 검색어 (예: URL 상태)
  value: string;
  // 입력을 반영할 때 (예: URL에 쓰기)
  onCommit: (next: string) => void;
}

/**
 * 검색 입력창 상태. 어디에 반영할지(URL 등)는 모르는 범용 훅.
 *
 * - 입력창 값은 로컬 state다. 키 입력과 동기적으로 갱신되므로 제어 입력이어도
 *   React가 IME 조합(한글·일본어)에 개입하지 않는다. 반영된 값을 그대로 입력창에
 *   쓰면 반영과 입력이 어긋날 때 조합 중 값이 덮어써져 `ㄱㅏㄴㅏ`처럼 깨진다.
 * - 낱자로 끝나는 중간 상태('맹ㅎ')는 반영하지 않고, 조합이 끝나면 반영한다.
 * - 반영된 값이 밖에서 바뀌면(뒤로가기, 다른 페이지에서 재진입) 입력창을 맞춘다.
 */
export function useSearchInput({
  value: committedValue,
  onCommit,
}: UseSearchInputOptions) {
  const [value, setValue] = useState(committedValue);

  // '내가' 마지막으로 반영한 값. 아래 동기화에서 내 반영과 외부 변경을 구분한다
  const lastCommittedRef = useRef(committedValue);

  const commit = (next: string) => {
    lastCommittedRef.current = next;
    onCommit(next);
  };

  const onChange = (next: string) => {
    // 표시값은 항상 갱신해야 조합 중인 글자가 입력창에 보인다
    setValue(next);

    if (endsWithIncompleteJamo(next)) {
      return;
    }

    commit(next);
  };

  // 조합이 끝났으면 낱자로 끝나더라도 반영한다.
  // (ㅁ만 입력하고 포커스를 옮기는 경우처럼 표시값과 반영값이 어긋나는 걸 막는다)
  const onCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    const next = event.currentTarget.value;

    setValue(next);
    commit(next);
  };

  const clear = () => {
    setValue('');
    commit('');
  };

  // 반영값 → 입력창 동기화. 밖에서 바뀐 경우에만 맞춘다.
  // 캐시 컴포넌트 + 레이아웃 공유 탓에 다른 페이지에서 재진입해도 컴포넌트가
  // 리마운트되지 않아 useState 초기값이 다시 읽히지 않는다.
  // 내 입력은 commit이 lastCommittedRef를 미리 갱신하므로 되받지 않는다(조합 방해 없음)
  useEffect(() => {
    if (committedValue !== lastCommittedRef.current) {
      lastCommittedRef.current = committedValue;
      setValue(committedValue);
    }
  }, [committedValue]);

  return { value, onChange, onCompositionEnd, clear };
}

export type { UseSearchInputOptions };
