import type { ReactNode } from 'react';

import type { ListMove } from '../../model/move';
import type { MoveSort, SortKey } from '../../model/sort';

import TableHeader from './table-header';
import TableRow from './table-row';

interface MoveTableProps {
  moves: ListMove[];
  sortState: MoveSort;
  onSort: (sortKey: SortKey) => void;
  // 행이 없을 때 본문 자리에 보일 내용 (결과 없음 안내)
  empty?: ReactNode;
}

export default function MoveTable({
  moves,
  sortState,
  onSort,
  empty,
}: MoveTableProps) {
  return (
    <div role="table" className="w-full">
      <TableHeader sortState={sortState} onSort={onSort} />
      <div role="rowgroup" className="isolate">
        {moves.length === 0 && empty ? (
          // 결과가 없어도 머리글은 남긴다 (데스크톱 정렬이 머리글에 있고, 같은 표에서 본문만 빈 것으로 읽히게)
          <div role="row">
            <div role="cell" aria-colspan={7} className="px-4">
              {empty}
            </div>
          </div>
        ) : (
          moves.map((move) => <TableRow key={move.identifier} move={move} />)
        )}
      </div>
    </div>
  );
}
