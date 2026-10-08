import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { getMoveHref, getMoveSubName, type Move } from '@/_entities/move';
import { TypeIconLabel } from '@/_entities/type';
import { DamageClassIconLabel } from '@/_entities/damage-class';

import MoveStatValue from '../move-stat-value';

interface MoveCardProps {
  move: Move;
}

export default function MoveCard({ move }: MoveCardProps) {
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
        'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
        '[@media(hover:hover)]:hover:bg-muted/70',
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[li:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [li:has(a:focus-visible)+&]:before:opacity-0',
      )}
    >
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-medium tabular-nums text-foreground/70">
          #{move.moveNumber}
        </span>

        {/* 왼쪽 이름 두 줄, 오른쪽 타입·분류(아이콘 아래 이름) */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-0.5">
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
          {/* 칸 폭을 고정(w-10, 세 글자 이름 약 37px이 들어가는 최소 폭)해 이름 길이와 관계없이 위아래 항목의 아이콘을 열처럼 맞춘다 */}
          <div className="flex shrink-0 gap-1">
            <TypeIconLabel type={move.type} className="w-10" />
            {/* Z·다이맥스 기술은 분류가 없어 생략한다 */}
            {move.damageClass && (
              <DamageClassIconLabel
                damageClass={move.damageClass}
                className="w-10"
              />
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
