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

function SearchDialog() {
  const { isOpen, setIsOpen, onKeyDown } = useSearchContext();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="hover:bg-accent p-2 h-10 aspect-square rounded-lg flex items-center justify-center active:bg-accent border-0"
        >
          {/* 'font-medium hover:bg-accent px-4 h-10 inline-flex items-center rounded-lg active:bg-accent focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-all duration-200', */}
          <SearchIcon className="size-5 text-muted-foreground " />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="gap-0 sm:max-w-xl px-0 rounded-2xl"
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
          className="flex flex-col h-[60vh] sm:h-120 overflow-hidden"
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

export default function SearchPoke() {
  return (
    <SearchProvider>
      <SearchDialog />
    </SearchProvider>
  );
}
