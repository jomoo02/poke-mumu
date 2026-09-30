import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';
import type { TableColumn } from '@/_shared/ui/data-table';
import type { Move } from '@/_entities/move';
import { TypeIconLabel } from '@/_entities/type';
import { DamageClassIconLabel } from '@/_entities/damage-class';

import type { SortKey } from '../../model/move-sort';
import MoveStatValue from '../move-stat-value';
import MoveNameCell from './move-name-cell';

// 숫자 셀 스켈레톤. 폭은 세 자리 숫자 정도
const STAT_SKELETON = (
  <div className="text-md">
    <SkeletonLine className="w-7" />
  </div>
);

// 타입·분류 셀 스켈레톤. IconLabel(아이콘 size-7 + gap-1 + text-xs 한 줄)과 같은 높이
const ICON_LABEL_SKELETON = (
  <div className="flex flex-col items-center gap-1">
    <Skeleton className="size-7 shrink-0 rounded-md" />
    <div className="text-xs">
      <SkeletonLine className="w-6" />
    </div>
  </div>
);

// 폭: 남는 폭을 이름 2 : 타입·분류 1 : 수치 0.75 비율로 나눠 표를 꽉 채운다.
// 수치는 오른쪽 끝에 붙으므로 덜 늘려서 넓은 화면에서 분류와 위력 사이가 벌어지지 않게 한다.
// 최소값(minmax 앞)은 헤더 정렬 버튼(라벨 + 아이콘)과 가장 긴 값이 한 줄에 들어가는 폭이다
// - #: 식별용이라 늘리지 않고 고정. 세 자리 번호 + 헤더 버튼
// - 이름: 최소 폭은 lg(본문 약 694px)에서 7열이 넘치지 않는 값.
//   이 폭에선 8자 넘는 이름(섀도애로우즈스트라이크 등)과 영문·일본어 이름이 말줄임되고,
//   화면이 넓어지면 2fr로 늘어나 다 보인다
// - 타입·분류: 아이콘 + 아래 이름을 가운데 정렬. 최소 폭에서도 세 글자(에스퍼·페어리)가 들어간다.
//   최소 폭에선 헤더 버튼이 셀보다 조금 넓지만 가운데 정렬이라 양옆 간격(gap) 안에 들어간다
// - 위력·명중: 헤더 버튼(두 글자 + 아이콘)이 셀 안쪽 폭에 들어가게
// skeleton은 각 cell과 같은 글꼴 크기·간격을 써서 로딩 전후 행 높이를 맞춘다
export const MOVE_COLUMNS: readonly TableColumn<Move, SortKey>[] = [
  {
    id: 'moveNumber',
    header: '#',
    width: '64px',
    sortKey: 'moveNumber',
    cell: (move) => (
      <MoveStatValue value={move.moveNumber} className="text-md" />
    ),
    skeleton: STAT_SKELETON,
  },
  {
    id: 'name',
    header: '이름',
    width: 'minmax(136px,2fr)',
    sortKey: 'name',
    cell: (move) => <MoveNameCell move={move} />,
    // 이름 링크는 글꼴 크기를 따로 두지 않아(본문 기본 크기) 첫 줄 막대도 기본 크기
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
    id: 'type',
    header: '타입',
    width: 'minmax(64px,1fr)',
    align: 'center',
    sortKey: 'type',
    cell: (move) => <TypeIconLabel type={move.type} />,
    skeleton: ICON_LABEL_SKELETON,
  },
  {
    id: 'damageClass',
    header: '분류',
    width: 'minmax(64px,1fr)',
    align: 'center',
    sortKey: 'damageClass',
    // Z·다이맥스 기술은 분류가 없다
    cell: (move) =>
      move.damageClass ? (
        <DamageClassIconLabel damageClass={move.damageClass} />
      ) : (
        <span className="text-md">-</span>
      ),
    skeleton: ICON_LABEL_SKELETON,
  },
  {
    id: 'power',
    header: '위력',
    width: 'minmax(80px,0.75fr)',
    align: 'right',
    sortKey: 'power',
    cell: (move) => <MoveStatValue value={move.power} className="text-md" />,
    skeleton: STAT_SKELETON,
  },
  {
    id: 'accuracy',
    header: '명중',
    width: 'minmax(80px,0.75fr)',
    align: 'right',
    sortKey: 'accuracy',
    cell: (move) => <MoveStatValue value={move.accuracy} className="text-md" />,
    skeleton: STAT_SKELETON,
  },
  {
    id: 'pp',
    header: 'PP',
    width: 'minmax(64px,0.75fr)',
    align: 'right',
    sortKey: 'pp',
    cell: (move) => <MoveStatValue value={move.pp} className="text-md" />,
    skeleton: STAT_SKELETON,
  },
];
