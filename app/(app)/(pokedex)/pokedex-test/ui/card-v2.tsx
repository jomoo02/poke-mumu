// /entities/poke/ui/PokeCard.tsx

import { PokeSprite } from '@/app/entities/poke/ui';
import Image from 'next/image';
import BarStats from '@/app/entities/stats/ui/bar-stats';

interface Poke {
  id?: number;
  dexNumber: number;
  pokeKey: string;
  sprite?: string;
  name: string;
  form?: string | null;
}

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

interface Type {
  id?: number;
  identifier: string;
  name: string;
  generation?: number;
  damageClassId?: number | null;
}

interface NationalPokeView extends Poke, Stats {
  type1: Type | null;
  type2: Type | null;
}

// ── 스탯 메타 ────────────────────────────────────────────────────────────────

const STAT_META: { key: keyof Stats; label: string }[] = [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: '공격' },
  { key: 'defense', label: '방어' },
  { key: 'specialAttack', label: '특수공격' },
  { key: 'specialDefense', label: '특수방어' },
  { key: 'speed', label: '속도' },
];

const MAX_STAT = 255;

// ── 서브 컴포넌트 ─────────────────────────────────────────────────────────────

function TypeTag({ name }: { name: string }) {
  return (
    <span className="inline-block px-3 py-0.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 bg-white leading-relaxed">
      {name}
    </span>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  const pct = Math.round((value / MAX_STAT) * 100);
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-14 shrink-0 text-sm font-semibold text-right text-gray-400">
        {label}
      </span>
      <span className="w-10 shrink-0 text-center text-sm font-bold text-gray-900 tabular-nums">
        {value}
      </span>
      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-900 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

interface PokeCardProps {
  poke: NationalPokeView;
}

export default function PokeCardV2({ poke }: PokeCardProps) {
  const {
    dexNumber,
    name,
    form,
    sprite,
    type1,
    type2,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
  } = poke;

  const stats = {
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
  };
  const types = [type1, type2].filter((t): t is Type => t !== null);

  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
      {/* 이미지 영역 */}
      <div className="bg-gray-50 flex items-center justify-center py-6 border-b border-gray-200">
        {sprite ? (
          <PokeSprite poke={poke} className="size-24" />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center text-gray-300 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="px-4 py-4 flex flex-col gap-3">
        {/* 이름 + 번호 */}
        <div className="flex items-baseline justify-between">
          <div className="min-w-0">
            <span className="text-xl font-extrabold text-gray-900 leading-none">
              {name}
            </span>
            {form && (
              <span className="ml-2 text-sm text-gray-400 font-medium">
                {form}
              </span>
            )}
          </div>
          <span className="shrink-0 ml-3 text-sm font-semibold text-gray-300 font-mono tabular-nums">
            #{String(dexNumber).padStart(4, '0')}
          </span>
        </div>

        {/* 타입 */}
        {types.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {types.map((t) => (
              <TypeTag key={t.identifier} name={t.name} />
            ))}
          </div>
        )}

        <BarStats stats={stats} />

        {/* <div className="flex items-center justify-between pt-1 pb-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-400">Total</span>
          <span className="text-lg font-black text-gray-900 tabular-nums">
            {total}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {STAT_META.map((s) => (
            <StatRow key={s.key} label={s.label} value={poke[s.key]} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
