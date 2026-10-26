import type { ComponentProps } from 'react';

import { cn } from '@/_shared/lib/cn';
import { ControlTriggerButton } from '@/_shared/ui/control';

import {
  DEFAULT_NAME_LANGUAGE,
  getNameLanguageLabel,
  type NameLanguage,
} from '../../model/name-language/name-language';

import { NAME_LANGUAGE_TITLE } from './name-language-panel';

interface NameLanguageTriggerProps extends ComponentProps<'button'> {
  language: NameLanguage;
}

// 필터 줄의 첫 버튼 [한국어 ⌄]. 필터 트리거(FilterTrigger)와 같은 모양으로,
// 기본값(한국어)이면 꺼진 모양, 다른 언어면 켜진 모양 (초기화 버튼이 보이는 조건과 같다)
export function NameLanguageTrigger({
  language,
  className,
  ...props
}: NameLanguageTriggerProps) {
  return (
    <ControlTriggerButton
      variant={language === DEFAULT_NAME_LANGUAGE ? 'default' : 'active'}
      className={cn('h-10 shrink-0', className)}
      {...props}
    >
      <span className="sr-only">{NAME_LANGUAGE_TITLE}: </span>
      {getNameLanguageLabel(language)}
    </ControlTriggerButton>
  );
}
