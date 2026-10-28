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

import {
  SEARCH_PLACEHOLDER,
  getNameLanguageLabel,
  type NameLanguage,
} from '../../model/name-language';
import { useConditions } from '../../model/conditions';
import type { PokeFilterOptions } from '../../model/filter';

// 입력창 접근 이름. 안내 글자와 같은 순서·표기에, 찾는 이름의 언어를 더한다
const getSearchInputLabel = (language: NameLanguage) =>
  `포켓몬 검색 (도감번호·${getNameLanguageLabel(language)} 이름)`;

interface PokeSearchBarProps {
  filterOptions: PokeFilterOptions;
  className?: string;
}

/**
 * [🔍 도감번호 또는 이름으로 검색  ✕]
 * 고른 이름 언어(필터 줄의 첫 버튼)로만 찾는다. 도감 번호는 언어와 상관없이 찾는다.
 * 검색어·언어 모두 URL 상태라 부모에게서 받지 않고 useConditions로 읽는다
 */
export default function PokeSearchBar({
  filterOptions,
  className,
}: PokeSearchBarProps) {
  const { keyword, setKeyword, language } = useConditions(filterOptions);

  const { value, onChange, onCompositionEnd, clear } = useSearchInput({
    value: keyword,
    onCommit: setKeyword,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className={cn('h-10 max-w-lg', className)}>
      <InputGroupAddon align="inline-start">
        <SearchIcon aria-hidden className="size-4.5" />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        placeholder={SEARCH_PLACEHOLDER}
        // 일본어 입력기 힌트·글꼴 (고른 이름 언어)
        lang={language}
        className="h-full"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        aria-label={getSearchInputLabel(language)}
      />
      <InputGroupAddon align="inline-end" className="h-full">
        {/* 지운 뒤 버튼이 사라지므로 포커스를 입력창으로 돌려 바로 다시 입력할 수 있게 한다 */}
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
      </InputGroupAddon>
    </InputGroup>
  );
}
