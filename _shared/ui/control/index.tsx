import { ChevronDownIcon, RotateCwIcon } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/_shared/ui/button';
import { cn } from '@/_shared/lib/cn';
import { Label } from '@/_shared/ui/label';

// 구 shared/ui/control 에서 새 트리가 쓰는 컴포넌트만 옮겼다.
// ControlField, ControlFieldLabel 은 field 가 _shared 에 없어 필요해질 때 옮긴다.

const controlTriggerButtonVariant = cva('transition-none group', {
  variants: {
    variant: {
      default:
        'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input text-foreground aria-expanded:bg-input/70 dark:aria-expanded:bg-input',

      active:
        'bg-primary hover:bg-primary/80 text-primary-foreground active:bg-primary/80 aria-expanded:bg-primary/80 dark:aria-expanded:bg-primary/80',
    },
    size: {
      // _shared Button 기본 gap(1.5)이 구 Button(2.5)과 달라 기존 간격을 명시한다
      default: 'h-10.5 gap-2.5',
      icon: 'size-10.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function ControlTriggerButton({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof controlTriggerButtonVariant>) {
  return (
    <Button
      className={cn(controlTriggerButtonVariant({ variant, size, className }))}
      {...props}
    >
      {children}
      {size === 'default' && (
        <ChevronDownIcon
          className={cn(
            'size-4.5 transition-transform duration-150',
            'group-data-popup-open:rotate-180',
          )}
        />
      )}
    </Button>
  );
}

function ControlRadioGroupLabel({
  className,
  ...props
}: React.ComponentProps<'label'>) {
  return (
    <Label
      className={cn(
        'relative isolate flex items-center gap-2.5 h-10 text-md cursor-pointer',
        'after:absolute after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg hover:after:bg-muted',
        className,
      )}
      {...props}
    />
  );
}

const controlResetButtonVariant = cva('text-foreground/70 group', {
  variants: {
    variant: {
      default: 'rounded-md text-base',
      small: 'gap-1.5 text-sm rounded-lg',
    },
    size: {
      default: 'h-12.5',
      small: 'h-7.5 -my-0.75 px-2 -mx-2',
    },
  },
  defaultVariants: {
    variant: 'small',
    size: 'small',
  },
});

function ControlResetButton({
  variant = 'small',
  size = 'small',
  className,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof controlResetButtonVariant>) {
  return (
    <Button
      variant={'ghost'}
      className={cn(controlResetButtonVariant({ variant, size, className }))}
      {...props}
    >
      {variant === 'small' && <RotateCwIcon className="size-3.25" />}
      초기화
    </Button>
  );
}

export { ControlTriggerButton, ControlRadioGroupLabel, ControlResetButton };
