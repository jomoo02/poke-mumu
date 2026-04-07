import { type Type } from '@/app/entities/type/model';

import { type RankView } from '../../model';
import Donut from './donut';

interface RanksProps {
  ranks: RankView;
  types: Type[];
}

export const getTopPercent = (rank: number, total: number): number => {
  if (total <= 0 || rank <= 0) return 100;
  if (rank === 1) return 1;
  if (rank === total) return 100;

  const percent = Math.ceil((rank / total) * 100);
  return Math.min(Math.max(percent, 2), 99);
};

export default function Ranks({ ranks, types }: RanksProps) {
  const statsRanks = [
    { label: 'HP', value: ranks.hpRank, tied: ranks.hpRankTied },
    { label: '공격', value: ranks.attackRank, tied: ranks.attackRankTied },
    { label: '방어', value: ranks.defenseRank, tied: ranks.defenseRankTied },
    {
      label: '특수공격',
      value: ranks.specialAttackRank,
      tied: ranks.specialAttackRankTied,
    },
    {
      label: '특수방어',
      value: ranks.specialDefenseRank,
      tied: ranks.specialDefenseRankTied,
    },
    { label: '스피드', value: ranks.speedRank, tied: ranks.speedRankTied },
    // { label: '총합', value: ranks.totalRank, tied: ranks.totalRankTied },
    // { label: 'type1', value: ranks.type1Rank, tied: ranks.type1Count },
    // { label: 'type2', value: ranks.type2Rank, tied: ranks.type2Count },
  ];

  const [type1, type2] = types;

  return (
    <div className="border rounded-2xl p-6 flex flex-col">
      <h3 className="text-xl font-semibold">등수</h3>
      {/* <div className="text-muted-foreground pt-2 text-sm">
        전체 {ranks.totalCount.toLocaleString()}마리 기준
      </div> */}
      <div className="pt-6 grid gap-3 grid-cols-2  sm:grid-cols-3 flex-1">
        {statsRanks.map((stat) => (
          <Item
            key={stat.label}
            value={stat.value}
            label={stat.label}
            tied={stat.tied}
            count={ranks.totalCount}
          />
        ))}

        <ItemWithTiedAndType
          label={`총합`}
          value={ranks.totalRank}
          tied={ranks.totalRankTied}
          count={ranks.totalCount}
        />

        <ItemWithTiedAndType
          label={`${type1.name} 타입`}
          value={ranks.type1Rank}
          tied={ranks.type1RankTied}
          count={ranks.type1Count}
        />
        {type2 && (
          <ItemWithTiedAndType
            label={`${type2.name} 타입`}
            value={ranks.type2Rank}
            tied={ranks.type2RankTied}
            count={ranks.type2Count}
          />
        )}
      </div>
      {/* <div className="pt-4  flex flex-1 flex-col md:flex-row">
        <div className="w-full">
          {statsRanks.map((stat) => (
            <ItemV2
              key={stat.label}
              value={stat.value}
              label={stat.label}
              tied={stat.tied}
              count={ranks.totalCount}
            />
          ))}
        </div>

        <div className="w-px h-full bg-border mx-6" />
        <div className="w-full flex flex-col justify-between">
          <div>
            <ItemWithTiedAndTypeV2
              label={`${type1.name} 타입`}
              value={ranks.type1Rank}
              tied={ranks.type1RankTied}
              count={ranks.type1Count}
            />
            {type2 && (
              <ItemWithTiedAndTypeV2
                label={`${type2.name} 타입`}
                value={ranks.type2Rank}
                tied={ranks.type2RankTied}
                count={ranks.type2Count}
              />
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
}

function Item({
  label,
  value,
  count,
}: {
  label: string;
  value: number;
  tied: number;
  count: number;
}) {
  const topPercent = getTopPercent(value, count);
  return (
    <div className="flex flex-col items-center justify-center border rounded-xl px-4 py-3.5">
      <div>
        <span className="text-muted-foreground text-sm font-medium">
          {label}
        </span>
      </div>

      <div className="pt-1">
        <span className="">{`${value}등`}</span>
        {/* <span className="text-sm text-muted-foreground">{` / ${count}`}</span> */}
      </div>
      <div className=" pt-1">
        <span className="text-xs font-medium bg-muted rounded-md px-1.5 py-0.5">
          상위 {topPercent}%
        </span>
      </div>
    </div>
  );
}

function ItemWithTiedAndType({
  label,
  value,
  tied,
  count,
}: {
  label: string;
  value: number;
  tied: number;
  count: number;
}) {
  const tiedText = tied > 1 ? `(공동 ${tied})` : '';
  const topPercent = getTopPercent(value, count);
  return (
    <div className=" flex flex-col items-center justify-center px-4 py-3.5 border rounded-xl">
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <div className="pt-1">
        <span>{`${value}등`}</span>
        <span className="text-sm text-muted-foreground">{` / ${count}`}</span>
      </div>
      <div className=" pt-1">
        <span className="text-xs font-medium bg-muted rounded-md px-1.5 py-0.5">
          상위 {topPercent}%
        </span>
      </div>
    </div>
  );
}

function ItemV2({
  label,
  value,
  tied,
  count,
}: {
  label: string;
  value: number;
  tied: number;
  count: number;
}) {
  const tiedText = tied > 1 ? `(${tied})` : '';
  return (
    <div className=" flex justify-between items-center py-3">
      <span className="text-muted-foreground font-medium">{label}</span>
      <div>
        <span>{`#${value}`}</span>
        <span className="text-sm text-muted-foreground">{` / ${count}`}</span>
      </div>
    </div>
  );
}

function ItemWithTiedAndTypeV2({
  label,
  value,
  tied,
  count,
}: {
  label: string;
  value: number;
  tied: number;
  count: number;
}) {
  const tiedText = tied > 1 ? `(${tied})` : '';
  return (
    <div className=" flex  justify-between items-center py-2">
      <span className="text-muted-foreground font-medium">{label}</span>
      <div className="">
        <span>{`#${value}`}</span>
        {/* <span className="text-sm">{tiedText}</span> */}
        <span className="text-sm text-muted-foreground">{` / ${count}`}</span>
      </div>
    </div>
  );
}
