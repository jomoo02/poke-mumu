'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { PopoverContent, Popover, PopoverTrigger } from '@/shared/ui/popover';

import { ControlTriggerButton } from './control-shared';

function ControlPopover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <Popover {...props} />;
}

interface ControlPopoverTriggerProps extends React.ComponentProps<'button'> {
  isActive: boolean;
  isOpen?: boolean;
}

function ControlPopoverTrigger({
  isActive,
  isOpen,
  children,
  ...props
}: ControlPopoverTriggerProps) {
  return (
    <PopoverTrigger {...props} asChild>
      <ControlTriggerButton isActive={isActive} isOpen={isOpen}>
        {children}
      </ControlTriggerButton>
    </PopoverTrigger>
  );
}

function ControlPopoverResetButton({
  className,
  isActive,
  ...props
}: React.ComponentProps<'button'> & { isActive?: boolean }) {
  return (
    <Button
      variant={'ghost'}
      disabled={isActive ? false : true}
      className={cn(
        'h-7.5 -my-0.75 text-foreground/70 px-2 gap-1.5  text-sm rounded-lg -mx-2',
        className,
      )}
      {...props}
    >
      <RotateCwIcon className="size-3.25" />
      초기화
    </Button>
  );
}

const controlPopoverBodyWidth: Record<number, string> = {
  1: 'w-58',
  2: 'w-114',
};

function ControlPopoverBody({
  className,
  children,
  columnCount = 1,
}: React.ComponentProps<'div'> & { columnCount?: number }) {
  const width = controlPopoverBodyWidth[columnCount] || 'w-58';
  return (
    <PopoverContent
      align="start"
      className={cn('z-1 px-0 py-4', width, className)}
    >
      {children}
    </PopoverContent>
  );
}

function ControlPopoverContent({
  className,
  children,
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex px-4 flex-col gap-4 max-h-84 overflow-auto no-scrollbar',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ControlPopoverContentGroup({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {children}
    </div>
  );
}
function ControlPopoverContentGroupLabel({
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className="text-xs text-foreground/70 font-medium" {...props}>
      {children}
    </div>
  );
}
function ControlPopoverHeader({
  className,
  children,
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex px-4 gap-0.5 justify-between items-center',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ControlPopoverTitle({
  className,
  children,
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('text-base font-medium', className)}>{children}</div>
  );
}

export {
  ControlPopover,
  ControlPopoverTrigger,
  ControlPopoverTitle,
  ControlPopoverContentGroup,
  ControlPopoverContentGroupLabel,
  ControlPopoverResetButton,
  ControlPopoverBody,
  ControlPopoverContent,
  ControlPopoverHeader,
};
