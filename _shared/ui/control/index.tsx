import { ChevronDownIcon, RotateCwIcon } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/_shared/ui/button';
import { cn } from '@/_shared/lib/cn';
import { Label } from '@/_shared/ui/label';

const controlTriggerButtonVariant = cva('transition-none group', {
  variants: {
    variant: {
      // 기본은 테두리만, 고르면 선택 색(--selected)으로 채운다
      default:
        'bg-transparent border-foreground/15 text-foreground hover:bg-accent aria-expanded:bg-accent',

      active:
        'bg-selected border-selected text-selected-foreground hover:bg-selected/90 aria-expanded:bg-selected/90',
    },
    size: {
      // 높이 체계: 36 글자 버튼 · 40 툴바 컨트롤 · 44 주 입력 · 48 터치(시트)
      // _shared Button 기본 gap(1.5)이 구 Button(2.5)과 달라 기존 간격을 명시한다
      default: 'h-10 gap-2',
      icon: 'size-10',
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
          data-icon="inline-end"
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
        'after:absolute after:inset-y-0 after:inset-x-0 after:-z-10 after:rounded-lg hover:after:bg-accent',
        className,
      )}
      {...props}
    />
  );
}

const controlResetButtonVariant = cva('text-foreground/70 group', {
  variants: {
    variant: {
      default: 'rounded-lg text-base',
      small: 'gap-1.5 text-sm rounded-lg',
    },
    size: {
      default: 'h-12',
      // 36px. 바깥 자리는 -my-1.5로 24px만 차지한다
      small: 'h-9 -my-1.5 pl-2 pr-3 -ml-2',
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
