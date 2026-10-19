import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';
import type { TableColumn } from '@/_shared/ui/data-table';
import type { Move } from '@/_entities/move';
import { TypeIcon } from '@/_entities/type';
import { DamageClassIcon } from '@/_entities/damage-class';
import type { SortKey } from '@/_pages/move/list/model/move-sort';
import MoveStatValue from '@/_pages/move/list/ui/results/move-stat-value';
import MoveNameCell from '@/_pages/move/list/ui/results/move-table/move-name-cell';

// 숫자 셀 스켈레톤. 폭은 세 자리 숫자 정도
const STAT_SKELETON = (
  <div className="text-md">
    <SkeletonLine className="w-7" />
  </div>
);

// 타입·분류 셀 스켈레톤. 아이콘(size-7)만
const ICON_SKELETON = <Skeleton className="size-7 shrink-0 rounded-sm" />;

// 폭: 남는 폭을 이름 2 : 수치 0.75 비율로 나눠 표를 꽉 채운다 (기존 /move와 같은 비율)
// - #: 식별용이라 늘리지 않고 고정. 세 자리 번호 + 헤더 버튼
// - 이름: 기존 /move와 같다 (한글 이름 아래 영문 / 일본어 이름)
// - 타입·분류: 아이콘(28) + 셀 패딩(28)으로 고정. 접근 이름은 아이콘의 alt
// - 위력·명중·PP: 헤더 정렬 버튼(라벨 + 아이콘)이 셀 안쪽에 들어가는 폭
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
    width: '56px',
    align: 'center',
    cell: (move) => <TypeIcon type={move.type} />,
    skeleton: ICON_SKELETON,
  },
  {
    id: 'damageClass',
    header: '분류',
    width: '56px',
    align: 'center',
    // Z·다이맥스 기술은 분류가 없다
    cell: (move) =>
      move.damageClass ? (
        <DamageClassIcon damageClass={move.damageClass} />
      ) : (
        // '-'는 스크린리더가 '대시'로 읽으므로 '없음'으로 바꿔 읽힌다
        <span className="text-md">
          <span aria-hidden>-</span>
          <span className="sr-only">없음</span>
        </span>
      ),
    skeleton: ICON_SKELETON,
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
