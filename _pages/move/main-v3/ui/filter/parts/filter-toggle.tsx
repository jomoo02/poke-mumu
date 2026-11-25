import type { ComponentProps, ReactNode } from 'react';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';

/**
 * 필터 선택지 (누르는 모양). 여러 개를 고를 수 있어 버튼마다 aria-pressed로 켜고 끈다.
 *   아이콘 있는 그룹 (타입·분류)   → 타일: 한 줄에 4개, [아이콘 / 이름] 세로
 *   아이콘 없는 그룹 (세대·모습)   → 칩: 한 줄에 3개, [이름]
 * 타일: 테두리 없음. 마우스를 올리면 옅은 배경, 고르면 배경(accent) + 아이콘 오른쪽 위에 ✓ 배지(선택 색).
 * 칩: 고르면 선택 색(--primary) 채움 + 반전 글자.
 * empty: 고르면 나올 결과가 없으면 내용을 흐리게 (고를 수는 있다)
 */
const BASE =
  'cursor-pointer border border-transparent bg-transparent font-medium text-foreground outline-none select-none ' +
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 ' +
  '[@media(hover:hover)]:hover:bg-muted/70 aria-pressed:bg-foreground/5 dark:aria-pressed:bg-foreground/20 [@media(hover:hover)]:hover:aria-pressed:bg-accent';

// 칩만: 고르면 채운다
const CHIP_PRESSED =
  'aria-pressed:bg-primary aria-pressed:text-primary-foreground [@media(hover:hover)]:aria-pressed:hover:bg-primary/90';

interface FilterToggleProps extends Omit<
  ComponentProps<'button'>,
  'onClick' | 'children'
> {
  pressed: boolean;
  onPressedChange: () => void;
  label: string;
  empty?: boolean;
}

// 타일 묶음: 한 줄에 4개
export function FilterTileGrid({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="group"
      className={cn('grid grid-cols-4 gap-2.5', className)}
      {...props}
    />
  );
}

interface FilterTileProps extends FilterToggleProps {
  // 28px 아이콘 (TypeIcon · DamageClassIcon, decorative)
  icon: ReactNode;
}

// [아이콘 / 이름] 세로 타일. 한 줄 4개로 고정하고 폭만 늘린다: 좁으면 정사각형, 넓어지면 높이 80(max-h-20)에서 멈춘다
export function FilterTile({
  pressed,
  onPressedChange,
  label,
  icon,
  empty = false,
  className,
  ...props
}: FilterTileProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onPressedChange}
      className={cn(
        BASE,
        'flex aspect-square max-h-20 py-2 w-full min-w-0 flex-col items-center justify-center gap-2 rounded-lg text-sm',
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
    </button>
  );
}

// 칩 묶음: 한 줄에 3개
export function FilterChipList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="group"
      className={cn('grid grid-cols-3 gap-2', className)}
      {...props}
    />
  );
}

// [이름] 칩. 높이 40
export function FilterChip({
  pressed,
  onPressedChange,
  label,
  empty = false,
  className,
  ...props
}: FilterToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onPressedChange}
      className={cn(
        BASE,
        CHIP_PRESSED,
        'inline-flex h-10 items-center rounded-full px-4 text-sm',
        className,
      )}
      {...props}
    >
      <span className={cn(empty && 'opacity-50')}>{label}</span>
    </button>
  );
}
