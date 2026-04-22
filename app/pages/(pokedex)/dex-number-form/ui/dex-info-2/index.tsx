import { cn } from '@/app/shared/lib/cn';
import { TypeBadge } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { NameView, type DexInfoView } from '../../model';
import PokeHeroImg from './poke-img';
import { Fragment } from 'react/jsx-runtime';
import { DotIcon } from 'lucide-react';

interface DexInfo2Props {
  dexInfo: DexInfoView;
  names: NameView[];
}

export default function DexInfo2({ dexInfo, names }: DexInfo2Props) {
  const { name, dexNumber, genera, weight, height, form, types, sprite } =
    dexInfo;
  const primaryType = types[0];

  return (
    <section className="relative overflow-hidden rounded-4xl bg-card">
      {/* 데스크탑: 이중 물결 (이미지 중앙까지) */}
      {primaryType && (
        <>
          {/* 뒷 물결 - 더 높게, 옅게 */}
          <svg
            aria-hidden
            className={cn(
              'hidden sm:block absolute inset-x-0 bottom-0 w-full h-72 lg:h-80 opacity-[0.08] dark:opacity-[0.18]',
              `text-${primaryType.identifier}`,
            )}
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C200,100 200,210 400,210 C600,210 600,100 800,100 C1000,100 1000,210 1200,210 L1200,320 L0,320 Z"
              fill="currentColor"
            />
          </svg>
          {/* 앞 물결 - 조금 낮게, 진하게 */}
          <svg
            aria-hidden
            className={cn(
              'hidden sm:block absolute inset-x-0 bottom-0 w-full h-56 lg:h-64 opacity-[0.15] dark:opacity-[0.30]',
              `text-${primaryType.identifier}`,
            )}
            viewBox="0 0 1200 260"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C200,80 200,170 400,170 C600,170 600,80 800,80 C1000,80 1000,170 1200,170 L1200,260 L0,260 Z"
              fill="currentColor"
            />
          </svg>
        </>
      )}

      {/* 모바일: 이중 물결 */}
      {primaryType && (
        <>
          <svg
            aria-hidden
            className={cn(
              'sm:hidden absolute inset-x-0 bottom-0 w-full h-80 opacity-[0.08] dark:opacity-[0.18]',
              `text-${primaryType.identifier}`,
            )}
            viewBox="0 0 600 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C100,100 100,210 200,210 C300,210 300,100 400,100 C500,100 500,210 600,210 L600,320 L0,320 Z"
              fill="currentColor"
            />
          </svg>
          <svg
            aria-hidden
            className={cn(
              'sm:hidden absolute inset-x-0 bottom-0 w-full h-64 opacity-[0.15] dark:opacity-[0.30]',
              `text-${primaryType.identifier}`,
            )}
            viewBox="0 0 600 260"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C100,80 100,170 200,170 C300,170 300,80 400,80 C500,80 500,170 600,170 L600,260 L0,260 Z"
              fill="currentColor"
            />
          </svg>
        </>
      )}

      {/* 모바일: flex-col 레이아웃 */}
      <div className="sm:hidden relative flex flex-col">
        <div className="flex flex-col gap-2 px-6 pt-6 pb-5">
          <span className="text-sm font-mono tracking-widest text-muted-foreground">
            No.{formatNumber(dexNumber)}
          </span>
          <h1 className="text-3xl font-bold tracking-tight leading-[0.95]">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-1.5">
            {names.map((n, index) => (
              <Fragment key={n.label}>
                {index > 0 && <DotIcon className="size-4.5" />}
                <div className="text-lg">{n.name}</div>
              </Fragment>
            ))}
          </div>
          {form && <p className="text-sm text-muted-foreground">{form}</p>}
          <div className="flex flex-wrap gap-2 pt-1">
            {types.map((t) => (
              <TypeBadge key={t.identifier} type={t} />
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center py-4">
          <div className="relative size-56">
            <PokeHeroImg
              sprite={sprite}
              name={name}
              type={primaryType}
              className="h-full w-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* 데스크탑: 겹침 레이아웃 */}
      <div className="hidden sm:block relative h-[28rem] lg:h-[32rem]">
        <div className="h-full flex items-center justify-center">
          <div className="relative size-72 lg:size-[26rem]">
            <PokeHeroImg
              sprite={sprite}
              name={name}
              type={primaryType}
              className="h-full w-full"
              priority
            />
          </div>
        </div>

        <div className="absolute left-8 top-8 lg:left-12 lg:top-12 z-10 flex flex-col gap-2 max-w-[55%]">
          <span className="text-lg  tracking-widest text-muted-foreground font-semibold">
            No.{formatNumber(dexNumber)}
          </span>
          <h1 className="text-5xl font-bold tracking-tight leading-[0.95]">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-1.5">
            {names.map((n, index) => (
              <Fragment key={n.label}>
                {index > 0 && <DotIcon className="size-4.5" />}
                <div className="text-lg">{n.name}</div>
              </Fragment>
            ))}
          </div>
          {form && <p className="text-base text-muted-foreground">{form}</p>}
          <div className="flex flex-wrap gap-2 pt-1">
            {types.map((t) => (
              <TypeBadge key={t.identifier} type={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  genera,
  height,
  weight,
}: {
  genera: string;
  height: string;
  weight: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-background/80 backdrop-blur-sm border px-4 py-3">
      <span className="text-base font-semibold">{genera}</span>
      <span className="text-sm text-muted-foreground tabular-nums">
        {height} · {weight}
      </span>
    </div>
  );
}
