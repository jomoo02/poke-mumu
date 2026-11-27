import { CheckIcon } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface FilterTileProps extends Omit<
  ComponentProps<'button'>,
  'onClick' | 'children'
> {
  pressed: boolean;
  onPressedChange: () => void;
  label: string;
  empty?: boolean;
  icon: ReactNode;
}

function FilterTileGrid({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="group"
      className={cn('grid grid-cols-4 gap-1.5', className)}
      {...props}
    />
  );
}

function FilterTile({
  pressed,
  onPressedChange,
  label,
  icon,
  empty = false,
  className,
  ...props
}: FilterTileProps) {
  return (
    <Button
      variant="ghost"
      aria-pressed={pressed}
      onClick={onPressedChange}
      className={cn(
        'cursor-pointer font-medium text-foreground transition-none active:not-aria-[haspopup]:translate-y-0',
        'hover:bg-accent aria-pressed:bg-accent dark:hover:bg-accent',
        'flex aspect-square max-h-20 h-full py-2 w-full min-w-0 flex-col items-center justify-center gap-2 rounded-lg text-sm',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'flex min-w-0 max-w-full flex-col items-center gap-1.5',
          empty && 'opacity-50',
        )}
      >
        {/* 고르면 아이콘 오른쪽 위에 ✓ 배지. ring은 고른 타일 배경(accent)과 같은 색으로 배지를 아이콘과 떼어 보이게 한다 */}
        <span className="relative flex">
          {icon}
          {pressed && (
            <span
              aria-hidden
              className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-accent"
            >
              <CheckIcon className="size-2.5" strokeWidth={3.5} />
            </span>
          )}
        </span>
        <span className="max-w-full truncate">{label}</span>
      </span>
    </Button>
  );
}

export { FilterTile, FilterTileGrid };
