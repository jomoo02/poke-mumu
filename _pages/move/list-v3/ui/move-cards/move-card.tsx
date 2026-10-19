import type { ComponentProps } from 'react';
import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { getMoveHref, getMoveSubName, type Move } from '@/_entities/move';
import { TypeIcon } from '@/_entities/type';
import { DamageClassIcon } from '@/_entities/damage-class';
import MoveStatValue from '@/_pages/move/list/ui/results/move-stat-value';

// 나머지 props(ref·style·data-index·aria-*)는 가상화 목록이 카드 위치를 잡는 데 쓴다
interface MoveCardProps extends Omit<ComponentProps<'li'>, 'children'> {
  move: Move;
  // 첫 카드는 위 구분선을 뺀다 (가상화로 그려진 첫 요소가 첫 카드가 아닐 수 있어 :first 대신)
  isFirst: boolean;
}

// 기존 카드(_pages/move/list)에서 타입·분류를 아이콘만 남기고 둘 사이를 좁혔다
export default function MoveCard({
  move,
  isFirst,
  className,
  ...props
}: MoveCardProps) {
  const href = getMoveHref(move);
  const subName = getMoveSubName(move);

  const stats = [
    { label: '위력', value: move.power },
    { label: '명중', value: move.accuracy },
    { label: 'PP', value: move.pp },
  ];

  return (
    <li
      className={cn(
        'flex flex-col gap-5 py-5 relative rounded-2xl -mx-3 px-3',
        'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border',
        isFirst && 'before:hidden',
        '[@media(hover:hover)]:hover:bg-muted/70',
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[li:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [li:has(a:focus-visible)+&]:before:opacity-0',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-medium tabular-nums text-foreground/70">
          #{move.moveNumber}
        </span>

        {/* 왼쪽 이름 두 줄, 오른쪽 타입·분류 아이콘(이름 첫 줄과 높이 28px로 같다).
            접근 이름은 아이콘의 alt */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <Link
              href={href}
              className={cn(
                'truncate text-lg font-medium',
                'after:absolute after:inset-0 after:rounded-2xl',
              )}
            >
              {move.nameKo}
            </Link>
            <div className="truncate text-sm text-foreground/70 font-medium">
              {subName}
            </div>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <TypeIcon type={move.type} />
            {/* Z·다이맥스 기술은 분류가 없어 생략한다 */}
            {move.damageClass && (
              <DamageClassIcon damageClass={move.damageClass} />
            )}
          </div>
        </div>
      </div>

      {/* 칸마다 폭을 고정(w-20)해 값 길이와 관계없이 위아래 항목의 수치를 열처럼 맞춘다 */}
      <dl className="flex gap-x-4 text-md">
        {stats.map((stat) => (
          <div key={stat.label} className="flex gap-2 w-20">
            <dt className="text-foreground/70">{stat.label}</dt>
            <dd className="font-medium">
              <MoveStatValue value={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </li>
  );
}
