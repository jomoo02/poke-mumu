import type { ReactNode } from 'react';

import type { BaseStatsPoke } from '../../model/poke';
import type { PokeSort, SortKey } from '../../model/sort';

import { INFO_COLUMNS, STAT_COLUMNS, TABLE_VARS } from './table-layout';
import TableHeader from './table-header';
import TableRow from './table-row';

interface PokedexTableProps {
  pokes: BaseStatsPoke[];
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
  // 행이 없을 때 본문 자리에 보일 내용 (결과 없음 안내)
  empty?: ReactNode;
}

const COLUMN_COUNT = INFO_COLUMNS.length + STAT_COLUMNS.length;

export default function PokedexTable({
  pokes,
  sortState,
  onSort,
  empty,
}: PokedexTableProps) {
  return (
    <div role="table" style={TABLE_VARS} className="w-full">
      <TableHeader sortState={sortState} onSort={onSort} />
      <div role="rowgroup" className="isolate">
        {pokes.length === 0 && empty ? (
          // 결과가 없어도 머리글은 남긴다 (데스크톱 정렬이 머리글에 있고, 같은 표에서 본문만 빈 것으로 읽히게).
          // 안내는 열 전체를 차지하는 셀 하나 (안내는 셀 가운데)
          <div role="row">
            <div role="cell" aria-colspan={COLUMN_COUNT} className="px-4">
              {empty}
            </div>
          </div>
        ) : (
          pokes.map((poke) => <TableRow key={poke.pokeKey} poke={poke} />)
        )}
      </div>
    </div>
  );
}
