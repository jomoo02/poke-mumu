import Link from 'next/link';

import { PokeSprite } from '@/entities/poke/ui';
import { type Type } from '@/entities/type/model';
import { TypeBadge, TypeIcon } from '@/entities/type/ui';
import { formatNumber } from '@/shared/lib/format';
import { cn } from '@/shared/lib/cn';

import { type NationalPoke } from '../model';

interface PokeCardProps {
  poke: NationalPoke;
  index: number;
  sortKey: string; // 현재 정렬 키 — 해당 필드를 primary 색으로 강조
}

// v2 카드를 가져오되 가상 스크롤/content-visibility 제거(한 페이지 ≤60).
// 이미지는 PokeSprite의 next/image(기본 lazy)로 충분.
export default function PokeCardV4({ poke, index, sortKey }: PokeCardProps) {
  const {
    dexNumber,
    nameKo,
    formKo,
    type1,
    type2,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
    pokeKey,
  } = poke;

  // const stats = [
  //   { key: 'hp', value: hp, label: 'HP' },
  //   { key: 'attack', value: attack, label: '공격' },
  //   { key: 'defense', value: defense, label: '방어' },
  //   { key: 'specialAttack', value: specialAttack, label: '특수공격' },
  //   { key: 'specialDefense', value: specialDefense, label: '특수방어' },
  //   { key: 'speed', value: speed, label: '스피드' },
  // ];
  const stats = [
    { key: 'hp', value: hp, label: 'H' },
    { key: 'attack', value: attack, label: 'A' },
    { key: 'defense', value: defense, label: 'B' },
    { key: 'specialAttack', value: specialAttack, label: 'C' },
    { key: 'specialDefense', value: specialDefense, label: 'D' },
    { key: 'speed', value: speed, label: 'S' },
  ];

  const types = [type1, type2].filter((t): t is Type => t !== null);

  // 현재 정렬 키와 일치하는 필드 여부
  const isActive = (key: string) => key === sortKey;

  return (
    <Link
      href={`/pokedex/${pokeKey}`}
      className="border flex flex-col rounded-4xl bg-card hover:bg-accent active:bg-accent shadow-sm @container relative"
    >
      <div className=" absolute top-5 right-5 z-4">
        <div className="text-foreground/50 font-semibold text-sm font-suite ">
          #{index}
        </div>
      </div>
      <div className="flex px-5 gap-3 pt-5 ">
        <div className="flex-1 flex gap-3.5 ">
          <div className="flex items-center justify-center aspect-square bg-muted/70 rounded-4xl">
            <PokeSprite poke={poke} className="size-18" />
          </div>

          <div>
            <div
              className={cn(
                'shrink-0 font-medium tabular-nums',
                isActive('dex') ? 'text-primary' : 'text-foreground/70',
              )}
            >
              <span className="text-sm">No.</span>
              <span className="text-md">{formatNumber(dexNumber)}</span>
            </div>
            <div className="">
              <div
                className={cn(
                  'text- min-w-0 truncate',
                  isActive('name') && 'text-primary',
                )}
              >
                {nameKo}
              </div>
              <div className="text-sm h-5 text-muted-foreground  font-medium min-w-0 truncate">
                {formKo}
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
      <div className="px-5 grid grid-cols-6 gap-1 pt-5">
        <div className="col-span-3">
          <span className="text-sm text-muted-foreground text-center">
            타입
          </span>
          <div className="flex gap-1 pt-1">
            {types.map((type) => (
              <TypeIcon
                key={type.identifier}
                type={type}
                className="size-7.25 rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="col-start-6">
          <div className="">
            <div
              className={cn(
                'shrink-0 font-meium text-sm  text-center',
                isActive('total') ? 'text-primary' : 'text-foreground/70',
              )}
            >
              총합
            </div>
            <div
              className={cn(
                'shrink-0 font-medium tabular-nums text-center text-md',
                isActive('total') && 'text-primary',
              )}
            >
              {total}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1 px-5 py-5 pt-3">
        {stats.map((stat) => {
          const active = isActive(stat.key);
          return (
            <div key={stat.label} className="flex flex-col">
              <div
                className={cn(
                  'text-sm text-center shrink-0 text-balance',
                  active ? 'text-primary' : 'text-foreground/70',
                )}
              >
                {stat.label}
              </div>
              <div
                className={cn(
                  'text-center tabular-nums text-md',
                  active && 'text-primary',
                )}
              >
                {stat.value}
              </div>
            </div>
          );
        })}
        {/* <div className="">
          <div
            className={cn(
              'shrink-0 font-meium text-sm  text-center',
              isActive('total') ? 'text-primary' : 'text-foreground/70',
            )}
          >
            총합
          </div>
          <div
            className={cn(
              'shrink-0 font-medium tabular-nums text-center text-md',
              isActive('total') && 'text-primary',
            )}
          >
            {total}
          </div>
        </div> */}
      </div>
    </Link>
  );
}
