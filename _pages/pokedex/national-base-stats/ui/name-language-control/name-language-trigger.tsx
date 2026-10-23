import { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/_shared/ui/button';
import { cn } from '@/_shared/lib/cn';

import {
  getNameLanguageLabel,
  type NameLanguage,
} from '../../model/name-language/name-language';

import { NAME_LANGUAGE_TITLE } from './name-language-panel';

interface NameLanguageTriggerProps extends ComponentProps<'button'> {
  language: NameLanguage;
}

export function NameLanguageTrigger({
  language,
  className,
  ...props
}: NameLanguageTriggerProps) {
  return (
    <Button
      variant={'ghost'}
      className={cn(
        'h-full shrink-0 cursor-pointer rounded-r-none',
        'bg-transparent hover:bg-transparent gap-2 pr-3',
        className,
      )}
      {...props}
    >
      <span className="sr-only">{NAME_LANGUAGE_TITLE}: </span>
      {getNameLanguageLabel(language)}
      <ChevronDownIcon aria-hidden className="size-4 text-foreground/70" />
    </Button>
  );
}
