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

// 순수 로컬 상태 바인딩(URL 미사용). 값/변경은 부모에서 관리.
export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <InputGroup className="max-w-xl mx-auto h-11">
      <InputGroupInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        placeholder={'포켓몬 이\u200B름 또는 도감 번호'}
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          tabIndex={-1}
          onClick={() => onChange('')}
          size="icon-sm"
          className={cn(value === '' ? 'hidden' : 'flex')}
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
