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

import { useKeywordParam } from '../model/search';

const SEARCH_PLACEHOLDER = '기술 이\u200B름으로 검색';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  const { keyword, setKeyword } = useKeywordParam();

  const { value, onChange, onCompositionEnd, clear } = useSearchInput({
    value: keyword,
    onCommit: setKeyword,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className={cn('h-10', className)}>
      <InputGroupAddon align="inline-start">
        <SearchIcon aria-hidden className="size-4.75" />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        placeholder={SEARCH_PLACEHOLDER}
        className="h-full md:text-md"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        enterKeyHint="search"
        aria-label="기술 검색"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          onClick={() => {
            clear();
            inputRef.current?.focus();
          }}
          aria-label="검색어 지우기"
          size="icon-sm"
          className={value === '' ? 'hidden' : 'flex rounded-lg cursor-pointer'}
        >
          <XIcon className="size-5" aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
