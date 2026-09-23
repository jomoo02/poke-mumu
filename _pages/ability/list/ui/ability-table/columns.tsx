import type { AbilityDetail } from '@/_entities/ability/model';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import type { TableColumn } from '../data-table';
import type { SortKey } from '../../model/ability-sort';
import AppearedBadge from '../appeared-badge';
import AbilityNameCell from './ability-name-cell';

// skeleton은 각 cell과 같은 글꼴 크기·간격을 써서 로딩 전후 행 높이를 맞춘다
export const ABILITY_COLUMNS: readonly TableColumn<AbilityDetail, SortKey>[] = [
  {
    id: 'name',
    header: '이름',
    width: 'minmax(0,2fr)',
    sortKey: 'name',
    cell: (ability) => <AbilityNameCell ability={ability} />,
    skeleton: (
      <div className="flex flex-col gap-1">
        <SkeletonLine className="w-20" />
        <div className="text-sm">
          <SkeletonLine className="w-36" />
        </div>
      </div>
    ),
  },
  {
    id: 'flavor',
    header: '설명',
    width: 'minmax(0,4fr)',
    cell: (ability) => (
      <p className="line-clamp-2 break-keep text-md">{ability.flavorText}</p>
    ),
    skeleton: (
      <div className="text-md">
        <SkeletonLine className="w-4/5" />
      </div>
    ),
  },
  {
    id: 'appeared',
    header: '등장',
    width: '112px',
    sortKey: 'appearance',
    cell: (ability) => <AppearedBadge ability={ability} />,
    // AppearedBadge: text-xs(16px) + py-1 = 24px
    skeleton: <Skeleton className="h-6 w-12" />,
  },
];
