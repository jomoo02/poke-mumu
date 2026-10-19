'use client';

import { useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/_shared/ui/input-group';
import { useSearchInput } from '@/_shared/lib/search-input';

import { usePokeSearch } from '../../model/poke-search';

interface PokeSearchInputProps {
  className?: string;
}

export default function PokeSearchInput({ className }: PokeSearchInputProps) {
  const placeholder = '피카츄, Pikachu, 25';

  const { keyword, setKeyword } = usePokeSearch();

  const { value, onChange, onCompositionEnd, clear } = useSearchInput({
    value: keyword,
    onCommit: setKeyword,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className={cn('w-full h-10.5', className)}>
      <InputGroupInput
        ref={inputRef}
        placeholder={placeholder}
        className="h-10.5"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        aria-label="포켓몬 검색 (이름·도감 번호)"
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" aria-hidden />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        {/* 지운 뒤 버튼이 사라지므로 포커스를 입력창으로 돌려 바로 다시 입력할 수 있게 한다 */}
        <InputGroupButton
          onClick={() => {
            clear();
            inputRef.current?.focus();
          }}
          aria-label="검색어 지우기"
          size={'icon-sm'}
          className={value === '' ? 'hidden' : 'flex'}
        >
          <XIcon className="size-5" aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
