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

import {
  STAT_KEYS,
  STAT_LABEL,
  STAT_SHORT_LABEL,
  type BaseStatsPoke,
} from '../../model/poke';

interface CardProps {
  poke: BaseStatsPoke;
}

function Card({ poke }: CardProps) {
  const href = getPokeHref(poke);
  const dexNumber = formatDexNumber(poke.dexNumber);
  const name = getPokeName(poke);

  return (
    // 상세 내용은 고를 뜻(hover · focus · touch)을 보일 때만 미리 받는다 (한 페이지 100개라 보이는 대로 받지 않는다)
    <IntentPrefetchLink
      href={href}
      // 카드 전체가 링크라 안의 능력치까지 한 번에 읽힌다: 링크 이름은 번호·이름만
      aria-label={`No.${dexNumber} ${name}`}
      className={cn(
        'flex flex-col [@media(hover:hover)]:hover:bg-muted/70',
        'gap-4 p-4 bg-card border rounded-3xl',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
    >
      <div className="flex min-w-0 items-center gap-x-3.5 w-full">
        <div className="size-16 shrink-0 rounded-2xl bg-muted/70 p-1.5">
          <PokeSprite poke={poke} alt="" className="size-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-y-px">
          <div className="text-sm min-w-0 font-medium text-foreground/70 tabular-nums truncate">
            No.{dexNumber}
          </div>
          <div className="min-w-0 truncate text-md font-medium">{name}</div>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-1">
          {getPokeTypes(poke).map((type) => (
            <TypeIcon key={type.identifier} type={type} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-1 w-full">
        {STAT_KEYS.map((statKey) => (
          <div
            key={statKey}
            className="flex flex-col gap-y-px items-center tabular-nums"
          >
            <div className="text-xs font-medium text-foreground/70">
              {STAT_SHORT_LABEL[statKey] === STAT_LABEL[statKey] ? (
                STAT_LABEL[statKey]
              ) : (
                <>
                  <div aria-hidden>{STAT_SHORT_LABEL[statKey]}</div>
                  <div className="sr-only">{STAT_LABEL[statKey]}</div>
                </>
              )}
            </div>
            <div className="text-sm">{poke.stats[statKey]}</div>
          </div>
        ))}
      </div>
    </IntentPrefetchLink>
  );
}

export default memo(Card);
