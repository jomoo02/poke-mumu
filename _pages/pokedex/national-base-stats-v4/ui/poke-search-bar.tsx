'use client';

import { useRef } from 'react';
import { XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/_shared/ui/input-group';
import { useSearchInput } from '@/_shared/lib/search-input';
import { usePokeSearch } from '@/_pages/pokedex/national-base-stats/model/poke-search';

import NameLanguagePicker from './name-language-picker';
import {
  NAME_LANGUAGE_LABEL,
  SEARCH_PLACEHOLDER,
  type NameLanguage,
} from '../model/name-language';

interface PokeSearchBarProps {
  language: NameLanguage;
  onLanguageChange: (language: NameLanguage) => void;
  className?: string;
}

/**
 * [한국어 ⌄ │ 피카츄, 25            ✕]
 * 고른 이름 언어로만 찾으므로 언어 버튼을 검색창 왼쪽 칸에 둔다 (전화번호의 국가 코드처럼 '이 검색창의 언어').
 * 안내 글자도 그 언어의 예시로 바뀐다. 도감 번호는 언어와 상관없이 찾는다.
 * 바탕은 한 덩어리, 포커스 링은 입력 칸(구분선 오른쪽)에만 둔다 (언어 버튼은 자기 링이 따로 있다)
 */
export default function PokeSearchBar({
  language,
  onLanguageChange,
  className,
}: PokeSearchBarProps) {
  const { keyword, setKeyword } = usePokeSearch();

  const { value, onChange, onCompositionEnd, clear } = useSearchInput({
    value: keyword,
    onCommit: setKeyword,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        'flex h-10.5 w-full items-stretch rounded-4xl bg-input/50 dark:bg-input/70',
        className,
      )}
    >
      <NameLanguagePicker language={language} onChange={onLanguageChange} />
      {/* 위아래 끝까지 닿는 구분선 */}
      <span aria-hidden className="w-px shrink-0 bg-foreground/10" />
      <InputGroup
        className={cn(
          'h-full min-w-0 flex-1 rounded-l-none',
          // 바탕은 바깥 덩어리가 칠한다
          'bg-transparent dark:bg-transparent',
        )}
      >
        <InputGroupInput
          ref={inputRef}
          placeholder={SEARCH_PLACEHOLDER[language]}
          lang={language}
          className="h-full pl-3.5"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onCompositionEnd={onCompositionEnd}
          autoComplete="off"
          aria-label={`포켓몬 검색 (${NAME_LANGUAGE_LABEL[language]} 이름·도감 번호)`}
        />
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
    </div>
  );
}
