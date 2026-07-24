'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';
import { useSearchParamsInput } from '@/shared/model/search-params-input';

export default function MoveSearch() {
  const placeholder = '냉동빔, Ice Beam, れいとうビーム';

  // 기술이 902개라 URL 커밋마다 목록 전체가 재필터/재정렬된다. 키 입력마다
  // 커밋하면(debounceMs=0) 그 무거운 동기 리렌더가 IME 조합을 방해해 한글이
  // 깨진다('고양이' → '고고양이'). 표시값은 즉시 갱신하되 커밋만 뒤로 미룬다.
  const { value, onChange, onCompositionEnd, clear } = useSearchParamsInput({
    debounceMs: 100,
  });

  return (
    <InputGroup className="w-full h-10.5 lg:max-w-md">
      <InputGroupInput
        placeholder={placeholder}
        className="h-10.5"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        aria-label="기술 검색 (한글·영문·일본어)"
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          tabIndex={-1}
          onClick={clear}
          aria-label="검색어 지우기"
          size={'icon-sm'}
          className={
            value === ''
              ? 'text-transparent hover:text-transparent hidden'
              : 'flex'
          }
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
