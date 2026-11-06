import { memo } from 'react';
import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import {
  PokeSprite,
  getPokeHref,
  getPokeName,
  getPokeTypes,
} from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';

import { STAT_KEYS, type BaseStatsPoke } from '../../model/base-stats-poke';

interface TableRowProps {
  poke: BaseStatsPoke;
}

function TableRow({ poke }: TableRowProps) {
  return (
    <div
      role="row"
      className={cn(
        'relative h-17.5',
        'grid grid-cols-(--table-cols) items-center',
        '[@media(hover:hover)]:hover:bg-muted/70 rounded-sm',
        'after:w-[calc(100%-8px)] after:mx-1 after:bg-border after:h-px after:absolute after:bottom-0 last:after:h-0',
      )}
    >
      <div role="cell" className="gap-3.5 px-4 flex items-center">
        <PokeSprite poke={poke} alt="" className="size-12.5" />

        <div className="text-center flex-1 text-md tabular-nums">
          {String(poke.dexNumber).padStart(4, '0')}
        </div>
      </div>

      <div role="cell" className="min-w-0 px-4">
        <Link
          href={getPokeHref(poke)}
          prefetch={false}
          className={cn(
            'block outline-none min-w-0 truncate',
            'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
            // 행 전체를 누를 수 있게
            'after:absolute after:inset-0',
          )}
        >
          <span className="text-md font-medium">{getPokeName(poke)}</span>
        </Link>
      </div>
      <div role="cell" className="flex px-3 xl:px-4">
        {/* 단일 타입도 두 칸 폭을 잡아 위아래 행의 첫째 타입이 열처럼 맞는다 (PokeTypes와 같다) */}
        <div className="grid grid-cols-2 gap-1">
          {getPokeTypes(poke).map((type) => (
            <TypeIcon key={type.identifier} type={type} />
          ))}
        </div>
      </div>
      {STAT_KEYS.map((key) => (
        <div
          key={key}
          role="cell"
          className={cn(
            'px-4 text-right text-md tabular-nums',
            // 총합은 능력치와 구분되게 조금 굵게 (열 순서상 맨 끝)
            key === 'total' && 'font-medium',
          )}
        >
          {poke.stats[key]}
        </div>
      ))}
    </div>
  );
}

// 키 입력 때 목록을 늦춰 그리는 동안(usePokeResults) 같은 포켓몬 행은 다시 그리지 않는다
export default memo(TableRow);
