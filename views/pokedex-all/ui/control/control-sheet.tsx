'use client';

import { Dialog as SheetPrimitive } from 'radix-ui';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import { Button } from '@/shared/ui/button';
import { ControlTriggerButton } from './control-shared';
import { cn } from '@/shared/lib/cn';
import { RotateCwIcon } from 'lucide-react';

function ControlSheet({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <Sheet {...props} />;
}

interface ControlSheetTriggerProps extends React.ComponentProps<
  typeof SheetPrimitive.Trigger
> {
  isActive: boolean;
  children: React.ReactNode;
}

function ControlSheetTrigger({
  isActive,
  children,
  isOpen,
  ...props
}: ControlSheetTriggerProps & { isOpen?: boolean }) {
  return (
    <SheetTrigger {...props} asChild>
      <ControlTriggerButton
        isActive={isActive}
        isOpen={isOpen}
        data-scroll-item
      >
        {children}
      </ControlTriggerButton>
    </SheetTrigger>
  );
}

interface ControlSheetBodyProps {
  children: React.ReactNode;
}

function ControlSheetBody({ children }: ControlSheetBodyProps) {
  return (
    <SheetContent
      side="bottom"
      className="gap-0 rounded-t-2xl"
      // showCloseButton={false}
    >
      {children}
    </SheetContent>
  );
}

function ControlSheetHeader({ ...props }: React.ComponentProps<'div'>) {
  return <SheetHeader {...props} />;
}

function ControlSheetTitle({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetTitle {...props} />;
}

function ControlSheetDescription({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetDescription {...props} />;
}

function ControlSheetContent({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className="flex flex-col px-6 max-h-[55dvh] overflow-auto no-scrollbar flex-1 gap-4"
      {...props}
    />
  );
}

function ControlSheetContentGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />;
}

function ControlSheetContentGroupLabel({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className="text-sm font-medium text-foreground/70" {...props} />;
}

function ControlSheetFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <SheetFooter className={cn('flex flex-row gap-2', className)} {...props} />
  );
}

function ControlSheetResetButton({ ...props }: React.ComponentProps<'button'>) {
  return (
    <Button
      variant={'secondary'}
      className="rounded-md text-base h-12.5 flex-1/3 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input active:bg-input/70 dark:active:bg-input"
      {...props}
    >
      초기화
    </Button>
  );
}

function ControlSheetCloseButton({ ...props }: React.ComponentProps<'button'>) {
  return (
    <Button
      className="flex-2/3 rounded-md text-base h-12.5 hover:bg-primary/70 active:bg-primary/70"
      {...props}
    >
      적용하기
    </Button>
  );
}

export {
  ControlSheet,
  ControlSheetTrigger,
  ControlSheetBody,
  ControlSheetHeader,
  ControlSheetTitle,
  ControlSheetDescription,
  ControlSheetContent,
  ControlSheetFooter,
  ControlSheetResetButton,
  ControlSheetCloseButton,
  ControlSheetContentGroup,
  ControlSheetContentGroupLabel,
};
