import { formatNumber } from '@/app/shared/lib/format';

import { NationalPokeView } from '../../model';
import { getStatKeys } from '@/app/entities/stats/model';
import { PokeSprite } from '@/app/entities/poke/ui';
import { TypeBadge, TypeIcon } from '@/app/entities/type/ui';

interface MobilePokeCardProps {
  poke: NationalPokeView;
}

const pokes = [
  {
    id: 1,
    name: '이상해씨',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['풀', '독'],
    stats: {
      hp: 45,
      atk: 49,
      def: 49,
      spA: 65,
      spD: 65,
      spd: 45,
    },
  },
  {
    id: 4,
    name: '파이리',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['불꽃'],
    stats: {
      hp: 39,
      atk: 52,
      def: 43,
      spA: 60,
      spD: 50,
      spd: 65,
    },
  },
];

const MAX_STAT = 200; // 시각화 기준

function StatBar({ label, value }: { label: string; value: number }) {
  const percent = (value / MAX_STAT) * 100;

  return (
    <div className="space-y-1">
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-gray-500 text-center">{label}</span>
        <span className="font-medium text-center">{value}</span>
      </div>

      {/* <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-blue-500 rounded"
          style={{ width: `${percent}%` }}
        />
      </div> */}
    </div>
  );
}

export default function MobilePokeCard({ poke }: MobilePokeCardProps) {
  const {
    name,
    form,
    total,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    type1,
    type2,
    pokeKey,
    dexNumber,
  } = poke;
  const formattedDexNumber = formatNumber(dexNumber);
  const statKeys = getStatKeys().filter((statKey) => statKey !== 'total');
  const baseStats = {
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
  };
  return (
    <div className=" space-y-5 p-4">
      {pokes.map((p) => {
        const total =
          p.stats.hp +
          p.stats.atk +
          p.stats.def +
          p.stats.spA +
          p.stats.spD +
          p.stats.spd;

        return (
          <div
            key={p.id}
            className="rounded-2xl border bg-white p-4 shadow-sm space-y-4"
          >
            {/* 상단 기본 정보 */}
            <div className="flex gap-4 items-center">
              <PokeSprite poke={poke} className="size-14" />

              <div className="flex-1">
                <div>#{p.id}</div>
                <div className="text-lg font-semibold">{p.name}</div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm w-14 text-center">타입</div>
                    <div className="flex gap-1">
                      {type1 && <TypeIcon type={type1} className="size-7 " />}
                      {type2 && <TypeIcon type={type2} className="size-7 " />}
                    </div>
                  </div>

                  <div className=" text-sm flex flex-col items-center gap-1">
                    <span className="text-gray-500">총합 </span>
                    <span className="font-semibold">{total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 스탯 영역 */}
            <div className="space-y-3 grid grid-cols-3 sm:grid-cols-6">
              <StatBar label="HP" value={p.stats.hp} />
              <StatBar label="공격" value={p.stats.atk} />
              <StatBar label="방어" value={p.stats.def} />
              <StatBar label="특수공격" value={p.stats.spA} />
              <StatBar label="특수방어" value={p.stats.spD} />
              <StatBar label="스피드" value={p.stats.spd} />
            </div>
          </div>
        );
      })}
    </div>

    // <div className="flex flex-col">
    //   <div className="h-full flex items-center">
    //     <div className="flex items-center h-full gap-4">
    //       <PokeSprite poke={poke} className="size-14" />
    //       {formattedDexNumber}
    //     </div>
    //   </div>
    // </div>
  );
}
