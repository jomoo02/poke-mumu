'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';
import { useSearchParamsInput } from '@/shared/model/search-params-input';

import { SEARCH_PARAMS } from '../../config';

export default function MoveSearch() {
  const placeholder = '냉동빔, Ice Beam, れいとうビーム';

  const { value, onChange, onCompositionEnd, clear } = useSearchParamsInput({
    key: SEARCH_PARAMS.SEARCH,
  });

  return (
    <InputGroup className="w-full h-10.5 lg:max-w-md flex-1">
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
