'use client';

import { SearchIcon } from 'lucide-react';
import { VisuallyHidden } from 'radix-ui';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/shared/ui/dialog';

import { SearchProvider, useSearchContext } from './provider/search.context';
import Input from './ui/input';
import Content from './ui/content';
import { Button } from '@/app/shared/ui/button';
import { useIsMobile } from '@/app/shared/model/use-mobile';
import Description from './ui/description';
import { cn } from '@/app/shared/lib/cn';
import ContentMobile from './ui/content-mobile';
import { useKeyboardHeight } from './model/useKeyboardHeight';

function SearchDialog() {
  const { isOpen, setIsOpen, onKeyDown } = useSearchContext();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="size-10">
          <SearchIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="gap-0 sm:max-w-xl px-0 rounded-4xl ring-4 shadow-xl bg-muted pt-0 overflow-hidden"
      >
        <DialogHeader className="gap-0">
          <DialogTitle>
            <VisuallyHidden.Root />
          </DialogTitle>
          <DialogDescription>
            <VisuallyHidden.Root />
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex flex-col h-[60dvh] sm:h-130 overflow-hidden"
          onKeyDown={onKeyDown}
        >
          <Input />
          {/* <Description /> */}
          <Content />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchDialogMobile() {
  const { isOpen, setIsOpen } = useSearchContext();
  const { keyboardHeight } = useKeyboardHeight(isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="size-10">
          <SearchIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        style={
          {
            // bottom: keyboardHeight,
            // maxHeight: `calc(80dvh - ${keyboardHeight}px)`,
          }
        }
        className={cn(
          'gap-0 w-full max-w-none px-0 rounded-4xl ring-2 shadow-xl py-0 overflow-hidden',
          `    top-auto bottom-0 left-0 translate-x-0 translate-y-0
    max-w-full rounded-t-3xl rounded-b-none
    data-open:zoom-in-100 data-closed:zoom-out-100
    data-open:slide-in-from-bottom data-closed:slide-out-to-bottom  h-[85dvh] flex flex-col 
    duration-200`,
        )}
      >
        <DialogHeader className="gap-0">
          <DialogTitle>
            <VisuallyHidden.Root />
          </DialogTitle>
          <DialogDescription>
            <VisuallyHidden.Root />
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Input />
          {/* <Description /> */}

          <ContentMobile />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function SearchPoke() {
  const isMobile = useIsMobile();
  return (
    <SearchProvider>
      {isMobile ? <SearchDialogMobile /> : <SearchDialog />}
    </SearchProvider>
  );
}
