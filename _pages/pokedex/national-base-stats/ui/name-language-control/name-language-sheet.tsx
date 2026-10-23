import { useState } from 'react';

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

import { NameLanguageOptionList } from './name-language-option-list';
import {
  NAME_LANGUAGE_DESCRIPTION,
  NAME_LANGUAGE_TITLE,
  type NameLanguagePanelProps,
} from './name-language-panel';
import { NameLanguageTrigger } from './name-language-trigger';

export function NameLanguageSheet({
  language,
  onChange,
}: NameLanguagePanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <NameLanguageTrigger language={language} className="md:hidden" />
        }
      />
      <SheetContent side="bottom" className="max-h-[85dvh] gap-0">
        <SheetHeader>
          <SheetTitle>{NAME_LANGUAGE_TITLE}</SheetTitle>
          <SheetDescription className="sr-only">
            {NAME_LANGUAGE_DESCRIPTION}
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6">
          <NameLanguageOptionList
            language={language}
            onChange={onChange}
            close={() => setOpen(false)}
            place="sheet"
          />
        </div>
        <SheetFooter>
          <SheetClose render={<SheetFooterButton variant="input" />}>
            닫기
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
