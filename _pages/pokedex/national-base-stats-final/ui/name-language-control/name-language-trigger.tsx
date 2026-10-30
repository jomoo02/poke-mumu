import type { ComponentProps } from 'react';

import { cn } from '@/_shared/lib/cn';
import { ControlTriggerButton } from '@/_shared/ui/control';

import {
  DEFAULT_NAME_LANGUAGE,
  getNameLanguageLabel,
  type NameLanguage,
} from '../../model/name-language';

import { NAME_LANGUAGE_TITLE } from './name-language-panel';

interface NameLanguageTriggerProps extends ComponentProps<'button'> {
  language: NameLanguage;
}

// 검색창 안 앞쪽의 [한국어 ⌄]. 검색창의 일부처럼 배경·호버·열림 배경·눌림 이동 없이 글자 + ⌄
// (키보드 포커스 링은 남긴다). 기본값(한국어)이 아니면 글자만 강조한다 (초기화 버튼이 보이는 조건과 같다)
export function NameLanguageTrigger({
  language,
  className,
  ...props
}: NameLanguageTriggerProps) {
  return (
    <ControlTriggerButton
      className={cn(
        'h-10 shrink-0 gap-1.5 px-1.5',
        'bg-transparent hover:bg-transparent aria-expanded:bg-transparent active:not-aria-[haspopup]:translate-y-0 dark:bg-transparent dark:hover:bg-transparent dark:aria-expanded:bg-transparent',
        'rounded-xl',
        className,
      )}
      {...props}
    >
      <span className="sr-only">{NAME_LANGUAGE_TITLE}: </span>
      {getNameLanguageLabel(language)}
    </ControlTriggerButton>
  );
}
