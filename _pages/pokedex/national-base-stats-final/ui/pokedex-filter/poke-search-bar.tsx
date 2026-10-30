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
  useLanguageParam,
  type NameLanguage,
} from '../../model/name-language';
import { useKeywordParam } from '../../model/search';
import NameLanguageControl from '../name-language-control';

// 입력창 접근 이름. 안내 글자와 같은 순서·표기에, 찾는 이름의 언어를 더한다
const getSearchInputLabel = (language: NameLanguage) =>
  `포켓몬 검색 (${getNameLanguageLabel(language)} 이름·도감번호)`;

interface PokeSearchBarProps {
  className?: string;
}

/**
 * [한국어⌄  이름·도감번호 검색   ✕ 🔍]
 * 이름 표기는 검색 언어를 정하므로 필터가 아닌 검색창 앞에 둔다 (이름 표시·이름순 정렬도 따른다).
 * 고른 언어의 이름으로만 찾고, 도감 번호는 언어와 상관없이 찾는다.
 * 검색어·언어 모두 URL 상태라 부모에게서 받지 않고 각 기능의 훅으로 읽는다
 */
export default function PokeSearchBar({ className }: PokeSearchBarProps) {
  const { keyword, setKeyword } = useKeywordParam();

  const { language, setLanguage } = useLanguageParam();

  const { value, onChange, onCompositionEnd, clear } = useSearchInput({
    value: keyword,
    onCommit: setKeyword,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className={cn('h-10.5', className)}>
      {/* 버튼이 있으면 붙는 음수 여백(has-[>button])을 없애고, 글자 시작을 입력창 안쪽 여백(16px)에 맞춘다.
          pr-2: 버튼과 입력 글자 사이를 띄운다 */}
      <InputGroupAddon
        align="inline-start"
        className="pr-0 pl-3 has-[>button]:ml-0"
      >
        <NameLanguageControl language={language} onChange={setLanguage} />
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
