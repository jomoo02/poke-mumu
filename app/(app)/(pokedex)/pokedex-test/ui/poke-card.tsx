import Link from 'next/link';

import { type NationalPokeView } from '@/app/pages/(pokedex)/all/model';
import { PokeSprite } from '@/app/entities/poke/ui';
import { TypeBadge } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

const LEFT_STATS = [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: '공격' },
  { key: 'defense', label: '방어' },
] as const;

const RIGHT_STATS = [
  { key: 'specialAttack', label: '특수공격' },
  { key: 'specialDefense', label: '특수방어' },
  { key: 'speed', label: '스피드' },
] as const;

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

export default function PokeCard({ poke }: { poke: NationalPokeView }) {
  return (
    <Link
      href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}
      className="flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/60 hover:shadow-md transition-all h-full"
    >
      {/* 상단: 스프라이트 + 이름 */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <PokeSprite poke={poke} className="size-16 shrink-0" />
        <div className="min-w-0 flex-1">
          <span className="text-sm text-muted-foreground font-mono leading-none">
            {formatNumber(poke.dexNumber)}
          </span>
          <div className="font-bold text-base text-foreground truncate leading-tight mt-0.5">
            {poke.name}
          </div>
          {poke.form && (
            <div className="text-sm text-muted-foreground truncate mt-0.5">
              {poke.form}
            </div>
          )}
        </div>
      </div>

      {/* 중단: 타입 | 총합 — flex items-stretch 로 같은 높이 */}
      <div className="flex items-stretch border-t border-border">
        <div className="flex flex-col justify-center gap-1.5 px-4 py-2.5 flex-1">
          {poke.type1 && (
            <TypeBadge type={poke.type1} className="w-15.5 h-7.25" />
          )}
          {poke.type2 && (
            <TypeBadge type={poke.type2} className="w-15.5 h-7.25" />
          )}
        </div>
        <div className="w-px bg-border shrink-0" />
        <div className="flex flex-col items-center justify-center px-4 py-2.5 flex-1 gap-0.5">
          <span className="text-sm text-muted-foreground leading-none">
            총합
          </span>
          <span className="text-2xl font-black text-primary tabular-nums leading-tight">
            {poke.total}
          </span>
        </div>
      </div>

      {/* 하단: 스탯 2열 */}
      <div className="border-t border-border px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-0">
        <div className="space-y-1.5">
          {LEFT_STATS.map(({ key, label }) => (
            <StatRow key={key} label={label} value={poke[key]} />
          ))}
        </div>
        <div className="space-y-1.5">
          {RIGHT_STATS.map(({ key, label }) => (
            <StatRow key={key} label={label} value={poke[key]} />
          ))}
        </div>
      </div>
    </Link>
  );
}
