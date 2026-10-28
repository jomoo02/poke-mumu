import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { PokeSprite, getPokeHref, getPokeTypes } from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';

import { STAT_KEYS, type BaseStatsPoke } from '../../model/base-stats-poke';
import {
  getBaseName,
  getFormName,
  type NameLanguage,
} from '../../model/name-language';

interface TableRowProps {
  poke: BaseStatsPoke;
  // 이름 표기 언어
  language: NameLanguage;
}

export default function TableRow({ poke, language }: TableRowProps) {
  const formName = getFormName(poke, language);

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
      <div role="cell" className="gap-4 px-4 flex items-center">
        <PokeSprite poke={poke} alt="" />

        <div className="text-center flex-1 text-md tabular-nums">
          {String(poke.dexNumber).padStart(4, '0')}
        </div>
      </div>

      <div role="cell" className="min-w-0 px-4 ">
        <Link
          href={getPokeHref(poke)}
          prefetch={false}
          lang={language === 'ko' ? undefined : language}
          className={cn(
            'block outline-none',
            'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'after:absolute after:inset-0',
          )}
        >
          <span className="block truncate text-md font-medium">
            {getBaseName(poke, language)}
          </span>
          {formName && (
            <>
              {/* 이름과 모습이 붙어 읽히지 않게 (줄바꿈은 화면에만 보인다) */}
              <span className="sr-only">, </span>
              <span className="block truncate text-sm text-foreground/70">
                {formName}
              </span>
            </>
          )}
        </Link>
      </div>
      <div role="cell" className="flex px-4 ">
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
            'px-4  text-right text-md tabular-nums',
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
