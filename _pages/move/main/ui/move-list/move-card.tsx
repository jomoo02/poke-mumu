import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getMoveHref } from '@/_entities/move';
import { TypeIcon } from '@/_entities/type';
import { DamageClassIcon } from '@/_entities/damage-class';

import type { ListMove } from '../../model/move';
import MoveStatValue from '../move-stat-value';

interface MoveCardProps {
  move: ListMove;
}

/**
 * 이름 ··········· [타입][분류]
 * 위력 90   명중 100   PP 15
 * 설명 (두 줄까지)
 * 정렬 기준(위력·명중·PP)은 모바일에서도 보여야 해서 수치 줄을 둔다
 */
function MoveCard({ move }: MoveCardProps) {
  const stats = [
    { label: '위력', value: move.power },
    { label: '명중', value: move.accuracy },
    { label: 'PP', value: move.pp },
  ];

  return (
    <IntentPrefetchLink
      href={getMoveHref(move)}
      className={cn(
        'flex h-full flex-col px-4 gap-1.5 py-3.5 rounded-2xl bg-card border',
        '[@media(hover:hover)]:hover:bg-muted/70',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
    >
      <div className="flex gap-3.5">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex min-w-0 items-center gap-x-3.5">
            <span className="min-w-0 flex-1 truncate text-base font-medium">
              {move.nameKo}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <TypeIcon type={move.type} />
          {move.damageClass && (
            <DamageClassIcon damageClass={move.damageClass} />
          )}
        </div>
      </div>
      <dl className="flex gap-x-3.5 text-md items-center pt-0.5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex gap-x-1.5">
            <dt className="text-foreground/70 font-medium">{stat.label}</dt>
            <dd className="font-medium w-7.25">
              <MoveStatValue value={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="line-clamp-2 break-keep pt-2 text-md text-foreground/70 h-12.5 max-w-[92%]">
        {move.description}
      </p>
    </IntentPrefetchLink>
  );
}

export default memo(MoveCard);
