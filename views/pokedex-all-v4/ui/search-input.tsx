'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';
import { cn } from '@/shared/lib/cn';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <InputGroup className="max-w-xl mx-auto h-11">
      <InputGroupInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label="포켓몬 이름 또는 도감 번호 검색"
        placeholder={'포켓몬 이\u200B름 또는 도감 번호'}
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          tabIndex={-1}
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
          size="icon-sm"
          className={cn(value === '' ? 'hidden' : 'flex')}
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
