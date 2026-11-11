import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import {
  PokeSprite,
  formatDexNumber,
  getPokeHref,
  getPokeName,
  getPokeTypes,
} from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';

import { STAT_KEYS, type BaseStatsPoke } from '../../model/poke';
import { GRID_CLASS } from './table-layout';

interface TableRowProps {
  poke: BaseStatsPoke;
}

function TableRow({ poke }: TableRowProps) {
  const dexNumber = formatDexNumber(poke.dexNumber);
  const href = getPokeHref(poke);
  const name = getPokeName(poke);

  return (
    <div
      role="row"
      className={cn(
        // 머리글과 같은 grid (열이 어긋나지 않게)
        GRID_CLASS,
        'relative h-17.5',
        '[@media(hover:hover)]:hover:bg-muted/70',
        'border-b last:border-b-0',
      )}
    >
      <div role="cell" className="gap-x-3.5 px-4 flex items-center">
        <PokeSprite poke={poke} alt="" className="size-12.5" />
        <div className="text-center flex-1 text-md tabular-nums">
          {dexNumber}
        </div>
      </div>
      <div role="cell" className="min-w-0 px-4">
        {/* 상세 내용은 고를 뜻(hover · focus · touch)을 보일 때만 미리 받는다 */}
        <IntentPrefetchLink
          href={href}
          className={cn(
            'outline-none block min-w-0 truncate',
            'focus-visible:rounded-xs focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'after:absolute after:inset-0',
          )}
        >
          <span className="text-md font-medium">{name}</span>
        </IntentPrefetchLink>
      </div>
      <div role="cell" className="flex px-4">
        <div className="grid grid-cols-2 gap-1">
          {getPokeTypes(poke).map((type) => (
            <TypeIcon key={type.identifier} type={type} />
          ))}
        </div>
      </div>
      {STAT_KEYS.map((statKey) => (
        <div
          key={statKey}
          role="cell"
          className={cn(
            'px-4 text-right text-md tabular-nums',
            statKey === 'total' && 'font-medium',
          )}
        >
          {poke.stats[statKey]}
        </div>
      ))}
    </div>
  );
}

export default memo(TableRow);
