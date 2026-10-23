'use client';

import { useId, useState, type ComponentProps } from 'react';
import { ChevronDownIcon, LanguagesIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { ControlRadioGroupLabel } from '@/_shared/ui/control';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import { getChoiceCloseHandlers } from '@/_shared/lib/choice-close-handler';
import {
  NAME_LANGUAGES,
  getNameLanguageLabel,
  NAME_LANGUAGE_OPTIONS,
  type NameLanguage,
} from '@/_pages/pokedex/national-base-stats/model/name-language';

const TITLE = '이름 언어';
const DESCRIPTION = '이름 표시와 검색에 쓰여요';

interface NameLanguagePickerProps {
  language: NameLanguage;
  onChange: (language: NameLanguage) => void;
}

/**
 * 검색창 앞 [한 ⌄] 버튼 → 이름 언어 목록. 고르면 반영하고 닫는다 (정렬 시트와 같은 규칙).
 * md 미만은 바텀시트, 이상은 팝오버. 둘 다 그려 두고 CSS로 하나만 보인다
 * (JS matchMedia는 첫 렌더가 한쪽으로 고정돼 트리거가 바뀐다. 툴바의 필터 트리거와 같은 방식)
 */
export default function NameLanguagePicker({
  language,
  onChange,
}: NameLanguagePickerProps) {
  return (
    <>
      <NameLanguageSheet language={language} onChange={onChange} />
      <NameLanguagePopover language={language} onChange={onChange} />
    </>
  );
}

function NameLanguageSheet({ language, onChange }: NameLanguagePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<PickerTrigger language={language} className="md:hidden" />}
      />
      <SheetContent side="bottom" className="max-h-[85dvh] gap-0">
        <SheetHeader className="pb-2">
          <SheetTitle>{TITLE}</SheetTitle>
          <SheetDescription>{DESCRIPTION}</SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6 pt-1 pb-6">
          <NameLanguageOptions
            language={language}
            onChange={onChange}
            close={() => setOpen(false)}
          />
        </div>
        <SheetFooter className="pb-[calc(--spacing(6)+env(safe-area-inset-bottom))]">
          <SheetClose render={<SheetFooterButton variant="input" />}>
            닫기
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function NameLanguagePopover({ language, onChange }: NameLanguagePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <PickerTrigger language={language} className="hidden md:flex" />
        }
      />
      <PopoverContent className="w-64">
        <PopoverHeader>
          <PopoverTitle>{TITLE}</PopoverTitle>
          <PopoverDescription>{DESCRIPTION}</PopoverDescription>
        </PopoverHeader>
        <NameLanguageOptions
          language={language}
          onChange={onChange}
          close={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

interface PickerTriggerProps extends ComponentProps<'button'> {
  language: NameLanguage;
}

// 검색창 왼쪽 칸: [文A 영어 ⌄]. 언어 아이콘으로 언어 선택지임을 보이고, 글자는 목록과 같은 이름.
// 검색창 높이를 다 채운다 (오른쪽은 구분선).
// 접근 이름은 '이름 언어: 영어' (보이는 글자를 포함한다)
function PickerTrigger({ language, className, ...props }: PickerTriggerProps) {
  return (
    <button
      type="button"
      aria-label={`${TITLE}: ${getNameLanguageLabel(language)}`}
      className={cn(
        'flex h-full shrink-0 cursor-pointer items-center gap-1.5 rounded-l-4xl pr-3 pl-3.5 text-sm font-medium text-foreground outline-none',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset',
        '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
        className,
      )}
      {...props}
    >
      <LanguagesIcon aria-hidden className="size-4 text-foreground/70" />
      {getNameLanguageLabel(language)}
      <ChevronDownIcon aria-hidden className="size-3.5 text-foreground/70" />
    </button>
  );
}

interface NameLanguageOptionsProps extends NameLanguagePickerProps {
  close: () => void;
}

// 세 언어 radio. 오른쪽에 그 언어로 쓴 예시 이름 (피카츄 / Pikachu / ピカチュウ)
function NameLanguageOptions({
  language,
  onChange,
  close,
}: NameLanguageOptionsProps) {
  const idPrefix = useId();

  const choiceCloseHandlers = getChoiceCloseHandlers(close);

  // 값은 unknown으로 오므로 알려진 언어일 때만 넘긴다
  const handleValueChange = (value: unknown) => {
    const next = NAME_LANGUAGES.find((candidate) => candidate === value);
    if (next) {
      onChange(next);
    }
  };

  return (
    <RadioGroup
      aria-label={TITLE}
      value={language}
      onValueChange={handleValueChange}
      className="gap-y-1"
    >
      {NAME_LANGUAGE_OPTIONS.map(({ value, label, example }) => {
        const id = `${idPrefix}-${value}`;

        return (
          <ControlRadioGroupLabel
            key={value}
            htmlFor={id}
            {...choiceCloseHandlers}
            className="h-11"
          >
            <RadioGroupItem id={id} value={value} />
            {label}
            <span
              lang={value}
              aria-hidden
              className="ml-auto text-sm text-foreground/70"
            >
              {example}
            </span>
          </ControlRadioGroupLabel>
        );
      })}
    </RadioGroup>
  );
}
