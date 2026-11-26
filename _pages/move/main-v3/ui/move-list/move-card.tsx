import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getMoveHref } from '@/_entities/move';
import { TypeIcon } from '@/_entities/type';
import { DamageClassIcon } from '@/_entities/damage-class';

import type { ListMove } from '../../model/move';
import type { SortKey } from '../../model/sort';
import MoveStatValue from '../move-stat-value';

interface MoveCardProps {
  move: ListMove;
  // 지금 정렬 기준. 수치 기준(위력·명중·PP)이면 그 값만 진하게 (이름순이면 강조 없음)
  sortKey: SortKey;
}

/**
 * 이름 ··········· [타입][분류]
 * 위력 90   명중 100   PP 15
 * 설명 (두 줄까지)
 * 정렬 기준(위력·명중·PP)은 모바일에서도 보여야 해서 수치 줄을 둔다.
 * 그 기준으로 정렬 중이면 그 수치만 진하게, 나머지는 흐리게 (왜 이 순서인지 목록 안에서 보이게)
 */
function MoveCard({ move, sortKey }: MoveCardProps) {
  const stats = [
    { key: 'power', label: '위력', value: move.power },
    { key: 'accuracy', label: '명중', value: move.accuracy },
    { key: 'pp', label: 'PP', value: move.pp },
  ] as const;

  return (
    <IntentPrefetchLink
      href={getMoveHref(move)}
      className={cn(
        'flex h-full flex-col px-5 gap-1.5 py-4.5 rounded-3xl bg-card border',
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
        {stats.map((stat) => {
          const isSortKey = stat.key === sortKey;

          return (
            <div key={stat.key} className="flex gap-x-1.5">
              <dt
                className={cn(
                  'font-medium',
                  isSortKey ? 'text-foreground' : 'text-foreground/70',
                )}
              >
                {stat.label}
              </dt>
              <dd
                className={cn(
                  'w-7.25',
                  isSortKey ? 'font-bold' : 'font-medium',
                )}
              >
                <MoveStatValue value={stat.value} />
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="line-clamp-2 break-keep pt-2 text-md text-foreground/70 h-12.5 max-w-[92%]">
        {move.description}
      </p>
    </IntentPrefetchLink>
  );
}

export default memo(MoveCard);
