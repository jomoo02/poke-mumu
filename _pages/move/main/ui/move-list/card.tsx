import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getMoveHref } from '@/_entities/move';
import { TypeIcon } from '@/_entities/type';
import { DamageClassIcon } from '@/_entities/damage-class';

import type { ListMove } from '../../model/move';
import MoveStatValue from '../move-stat-value';
import {
  CARD_CLASS,
  FIRST_ROW_CLASS,
  NUMBER_CLASS,
  STAT_ITEM_CLASS,
  STAT_ROW_CLASS,
} from './list-layout';

interface CardProps {
  move: ListMove;
}

/**
 * 번호  이름 ··········· [타입][분류]
 * 위력 90   명중 100   PP 15
 * 정렬 기준(위력·명중·PP)은 모바일에서도 보여야 해서 수치 줄을 둔다. 설명은 상세에서 본다
 */
function Card({ move }: CardProps) {
  const stats = [
    { label: '위력', value: move.power },
    { label: '명중', value: move.accuracy },
    { label: 'PP', value: move.pp },
  ];

  return (
    <IntentPrefetchLink
      href={getMoveHref(move)}
      className={cn(
        CARD_CLASS,
        '[@media(hover:hover)]:hover:bg-muted/70',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
    >
      {/* 특성 카드 한 줄과 같은 구조: 번호 · 이름 ··· 오른쪽 끝 (특성은 등장 배지, 기술은 타입·분류) */}
      <div className={FIRST_ROW_CLASS}>
        <span className={NUMBER_CLASS}>{move.moveNumber}</span>
        <span className="min-w-0 flex-1 truncate text-md font-medium">
          {move.nameKo}
        </span>
        {/* 접근 이름은 아이콘의 alt. Z·다이맥스 기술은 분류가 없어 생략한다 */}
        <div className="flex shrink-0 gap-1">
          <TypeIcon type={move.type} />
          {move.damageClass && (
            <DamageClassIcon damageClass={move.damageClass} />
          )}
        </div>
      </div>
      <dl className={STAT_ROW_CLASS}>
        {stats.map((stat) => (
          <div key={stat.label} className={STAT_ITEM_CLASS}>
            <dt className="text-foreground/70 font-medium">{stat.label}</dt>
            <dd className="font-medium">
              <MoveStatValue value={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </IntentPrefetchLink>
  );
}

export default memo(Card);
