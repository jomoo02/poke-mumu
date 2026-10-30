import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';

import { NameLanguageOptionList } from './name-language-option-list';
import {
  NAME_LANGUAGE_DESCRIPTION,
  NAME_LANGUAGE_TITLE,
  type NameLanguagePanelProps,
} from './name-language-panel';
import { NameLanguageTrigger } from './name-language-trigger';

export function NameLanguagePopover({
  language,
  onChange,
}: NameLanguagePanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <NameLanguageTrigger language={language} className="hidden md:flex" />
        }
      />
      <PopoverContent className="w-58 -ml-3" align="start">
        <PopoverHeader>
          <PopoverTitle>{NAME_LANGUAGE_TITLE}</PopoverTitle>
          <PopoverDescription className="sr-only">
            {NAME_LANGUAGE_DESCRIPTION}
          </PopoverDescription>
        </PopoverHeader>
        <NameLanguageOptionList
          language={language}
          onChange={onChange}
          close={() => setOpen(false)}
          place="popover"
        />
      </PopoverContent>
    </Popover>
  );
}
