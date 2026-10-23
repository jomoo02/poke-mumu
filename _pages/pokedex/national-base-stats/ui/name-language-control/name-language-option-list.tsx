import { useId } from 'react';

import { getCloseOnSelectHandlers } from '@/_shared/lib/close-on-select-handler';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';
import { ControlRadioGroupLabel } from '@/_shared/ui/control';

import {
  NAME_LANGUAGE_OPTIONS,
  NAME_LANGUAGES,
} from '../../model/name-language/name-language';

import type { NameLanguagePanelProps } from './name-language-panel';

type OptionListPlace = 'sheet' | 'popover';

interface NameLanguageOptionListProps extends NameLanguagePanelProps {
  close: () => void;
  place: OptionListPlace;
}

// radio 줄 높이·줄 간격. 시트는 터치 목표 44px, 팝오버는 마우스·태블릿이라 조금 촘촘하게
const OPTION_ROW_CLASS: Record<OptionListPlace, string> = {
  sheet: 'h-11',
  popover: 'h-10.5',
};

const OPTION_GAP_CLASS: Record<OptionListPlace, string> = {
  sheet: 'gap-y-1.5',
  popover: 'gap-y-1',
};

export function NameLanguageOptionList({
  language,
  onChange,
  close,
  place,
}: NameLanguageOptionListProps) {
  const idPrefix = useId();

  const closeOnSelectHandlers = getCloseOnSelectHandlers(close);

  // 값은 unknown으로 오므로 알려진 언어일 때만 넘긴다
  const handleValueChange = (value: unknown) => {
    const next = NAME_LANGUAGES.find((candidate) => candidate === value);
    if (next) {
      onChange(next);
    }
  };

  return (
    <RadioGroup
      value={language}
      onValueChange={handleValueChange}
      className={OPTION_GAP_CLASS[place]}
    >
      {NAME_LANGUAGE_OPTIONS.map(({ value, label }) => {
        const id = `${idPrefix}-${value}`;

        return (
          <ControlRadioGroupLabel
            key={value}
            htmlFor={id}
            {...closeOnSelectHandlers}
            className={OPTION_ROW_CLASS[place]}
          >
            <RadioGroupItem id={id} value={value} />
            {label}
          </ControlRadioGroupLabel>
        );
      })}
    </RadioGroup>
  );
}
