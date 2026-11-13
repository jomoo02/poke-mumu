import { useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { useSearchInput } from '@/_shared/lib/search-input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/_shared/ui/input-group';

import { useKeywordParam } from '../model/search';

const SEARCH_PLACEHOLDER = '특성 검색';

// 빈 결과의 초기화가 포커스를 돌려줄 입력창
export const SEARCH_INPUT_ID = 'ability-search-input';

interface SearchBarProps {
  className?: string;
}

/**
 * [🔍 이름 검색   ✕]
 * 검색어는 URL 상태라 부모에게서 받지 않고 훅으로 읽는다
 */
export default function SearchBar({ className }: SearchBarProps) {
  const { keyword, setKeyword } = useKeywordParam();

  const { value, onChange, onCompositionEnd, clear } = useSearchInput({
    value: keyword,
    onCommit: setKeyword,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className={cn('h-10.5 lg:max-w-2/5', className)}>
      <InputGroupAddon align="inline-start">
        <SearchIcon aria-hidden className="size-4.75" />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        id={SEARCH_INPUT_ID}
        placeholder={SEARCH_PLACEHOLDER}
        className="h-full"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        enterKeyHint="search"
        aria-label="특성 이름 검색"
      />
      {/* 오른쪽 여백은 기본값(pr-4): ✕ 중심이 돋보기 중심과 같은 거리(약 26px)가 된다 */}
      <InputGroupAddon align="inline-end">
        {/* 입력값이 있을 때만. 지운 뒤 버튼이 사라지므로 포커스를 입력창으로 돌려 바로 다시 입력할 수 있게 한다 */}
        <InputGroupButton
          onClick={() => {
            clear();
            inputRef.current?.focus();
          }}
          aria-label="검색어 지우기"
          size="icon-sm"
          className={value === '' ? 'hidden' : 'flex rounded-lg'}
        >
          <XIcon className="size-5" aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
