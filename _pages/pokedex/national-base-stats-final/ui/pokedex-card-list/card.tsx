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
import {
  getBaseName,
  getFormName,
  type NameLanguage,
} from '../../model/name-language';

interface CardProps {
  poke: BaseStatsPoke;
  language: NameLanguage;
}

function Card({ poke, language }: CardProps) {
  const formName = getFormName(poke, language);

  return (
    <Link
      href={getPokeHref(poke)}
      className={cn(
        'flex flex-col relative',
        '[@media(hover:hover)]:hover:bg-muted/70',
        'gap-4 py-3.5 px-1 -mx-1',
        // 'sm:gap-y-4 sm:rounded-4xl sm:px-5 sm:py-4 sm:mx-0',
        // 'sm:bg-card sm:border',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'after:w-[calc(100%-8px)]  after:bg-border after:h-px after:absolute after:bottom-0 [li:last-child>&]:after:h-0',
      )}
    >
      <div className="flex min-w-0 items-center gap-x-3.5 max-w-lg mx-auto w-full">
        <div className="size-16 shrink-0 rounded-2xl bg-muted/70 p-1.75">
          <PokeSprite poke={poke} alt="" className="size-full" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-x-3">
          <span
            className={cn(
              'shrink-0 text-sm font-medium text-foreground/70 tabular-nums',
            )}
          >
            {String(poke.dexNumber).padStart(4, '0')}
          </span>
          <div
            lang={language === 'ko' ? undefined : language}
            className={cn('block min-w-0 flex-1 outline-none')}
          >
            <span className={cn('block truncate text-md font-medium')}>
              {getBaseName(poke, language)}
            </span>
            {formName && (
              <>
                {/* 이름과 모습이 붙어 읽히지 않게 (줄바꿈은 화면에만 보인다) */}
                <span className="sr-only">, </span>
                <span className="mt-0.5 block truncate text-sm text-foreground/70">
                  {formName}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-1">
          {getPokeTypes(poke).map((type) => (
            <TypeIcon key={type.identifier} type={type} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-x-1 max-w-lg mx-auto w-full">
        {STAT_KEYS.map((key) => (
          <div
            key={key}
            className={cn(
              'flex flex-col items-center rounded-md py-0.5 text-sm tabular-nums',
              key === 'total' && 'font-medium',
            )}
          >
            {/* 화면엔 줄인 이름(특공), 스크린리더엔 정식 이름(특수공격) */}
            <div className="text-xs font-medium text-foreground/70">
              {STAT_SHORT_LABEL[key] === STAT_LABEL[key] ? (
                STAT_LABEL[key]
              ) : (
                <>
                  <div aria-hidden>{STAT_SHORT_LABEL[key]}</div>
                  <div className="sr-only">{STAT_LABEL[key]}</div>
                </>
              )}
            </div>
            <div>{poke.stats[key]}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}

// 키 입력 때 목록을 늦춰 그리는 동안(usePokeResults) 같은 포켓몬 행은 다시 그리지 않는다
export default memo(Card);
