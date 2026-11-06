'use client';

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

import { useKeywordParam } from '../../model/search';

// 안내 글자. '이'와 '름' 사이에 폭 없는 공백(U+200B):
// iOS Safari가 '이름'을 보고 키보드 위에 연락처 자동 완성을 띄우는 것을 막는다
const SEARCH_PLACEHOLDER = '이\u200B름·도감번호 검색';

interface PokeSearchBarProps {
  className?: string;
}

/**
 * [이름·도감번호 검색   ✕ 🔍]
 * 검색어는 URL 상태라 부모에게서 받지 않고 훅으로 읽는다
 */
export default function PokeSearchBar({ className }: PokeSearchBarProps) {
  const { keyword, setKeyword } = useKeywordParam();

  const { value, onChange, onCompositionEnd, clear } = useSearchInput({
    value: keyword,
    onCommit: setKeyword,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className={cn('h-10.5', className)}>
      <InputGroupInput
        ref={inputRef}
        placeholder={SEARCH_PLACEHOLDER}
        className="h-full"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        aria-label="포켓몬 검색 (이름·도감번호)"
      />
      <InputGroupAddon align="inline-end" className="h-full gap-2.5 pr-5">
        {/* 입력값이 있을 때만. 지운 뒤 버튼이 사라지므로 포커스를 입력창으로 돌려 바로 다시 입력할 수 있게 한다 */}
        <InputGroupButton
          onClick={() => {
            clear();
            inputRef.current?.focus();
          }}
          aria-label="검색어 지우기"
          size="icon-sm"
          className={value === '' ? 'hidden' : 'flex'}
        >
          <XIcon className="size-5" aria-hidden />
        </InputGroupButton>
        <SearchIcon aria-hidden className="size-4.75" />
      </InputGroupAddon>
    </InputGroup>
  );
}
