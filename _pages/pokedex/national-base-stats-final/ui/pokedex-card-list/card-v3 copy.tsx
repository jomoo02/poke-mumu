import { memo } from 'react';
import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { PokeSprite, getPokeHref, getPokeTypes } from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';

import {
  STAT_KEYS,
  STAT_LABEL,
  STAT_SHORT_LABEL,
  type BaseStatsPoke,
  type StatKey,
} from '../../model/base-stats-poke';

interface CardProps {
  poke: BaseStatsPoke;
}

function CardV3({ poke }: CardProps) {
  return (
    <Link
      href={getPokeHref(poke)}
      className={cn(
        'flex flex-col relative',
        '[@media(hover:hover)]:hover:bg-muted/70',
        'gap- p-4 bg-card border rounded-3xl gap-y-1',
        // 'sm:gap-y-4 sm:rounded-4xl sm:px-5 sm:py-4 sm:mx-0',
        // 'sm:bg-card sm:border',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
    >
      <div className="flex min-w-0 items-center gap-x-3.5  w-full">
        <div className="size-16 shrink-0 rounded-2xl bg-muted/70 p-1.75">
          <PokeSprite poke={poke} alt="" className="size-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-x-3">
          <span
            className={cn(
              'shrink-0 text-sm font-medium text-foreground/70 tabular-nums',
            )}
          >
            {String(poke.dexNumber).padStart(4, '0')}
          </span>
          <div className={cn(' min-w-0 flex-1 outline-none flex items-center')}>
            <span className={cn('block truncate text-md font-medium')}>
              {poke.nameKo}
            </span>
            {poke.form?.shortKo && (
              <>
                {/* 이름과 모습이 붙어 읽히지 않게 (줄바꿈은 화면에만 보인다) */}
                <span className="sr-only">, </span>
                <span className="ml-0.5  truncate text-md ">
                  ({poke.form?.shortKo})
                </span>
              </>
            )}
          </div>
        </div>

        <div className="">
          <div className="grid shrink-0 grid-cols-2 gap-1">
            {getPokeTypes(poke).map((type) => (
              <TypeIcon key={type.identifier} type={type} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-1.5 gap-y-2  w-full">
        <div className="text-sm flex col-start-3 mx-auto">
          <div className="w-13.5">총합</div>
          <div className="w-9.25 text-center">{poke.stats.total}</div>
        </div>

        {STAT_KEYS.filter((key) => key !== 'total').map((key) => (
          <div
            key={key}
            className={cn(
              'flex  rounded-md  text-sm tabular-nums',
              // key === 'total' && 'font-medium',
              ' ',
              // 'mx-auto',
            )}
          >
            {/* 화면엔 줄인 이름(특공), 스크린리더엔 정식 이름(특수공격) */}
            <div className="text-sm font-medium text-foreground/70  min-w-13.5">
              {STAT_SHORT_LABEL[key] === STAT_LABEL[key] ? (
                STAT_LABEL[key]
              ) : (
                <>
                  <div aria-hidden>{STAT_LABEL[key]}</div>
                  <div className="sr-only">{STAT_LABEL[key]}</div>
                </>
              )}
            </div>
            <div className="w-10 text-right">{poke.stats[key]}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}

// 키 입력 때 목록을 늦춰 그리는 동안(usePokeResults) 같은 포켓몬 행은 다시 그리지 않는다
export default memo(CardV3);
