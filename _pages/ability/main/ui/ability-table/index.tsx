import type { ReactNode } from 'react';

import type { ListAbility } from '../../model/ability';
import type { AbilitySort, SortKey } from '../../model/sort';

import { COLUMNS, TABLE_VARS } from './table-layout';
import TableHeader from './table-header';
import TableRow from './table-row';

interface AbilityTableProps {
  abilities: ListAbility[];
  sortState: AbilitySort;
  onSort: (sortKey: SortKey) => void;
  // 행이 없을 때 본문 자리에 보일 내용 (결과 없음 안내)
  empty?: ReactNode;
}

export default function AbilityTable({
  abilities,
  sortState,
  onSort,
  empty,
}: AbilityTableProps) {
  return (
    <div role="table" style={TABLE_VARS} className="w-full">
      <TableHeader sortState={sortState} onSort={onSort} />
      <div role="rowgroup" className="isolate">
        {abilities.length === 0 && empty ? (
          // 결과가 없어도 머리글은 남긴다 (데스크톱 정렬이 머리글에 있고, 같은 표에서 본문만 빈 것으로 읽히게)
          <div role="row">
            <div role="cell" aria-colspan={COLUMNS.length} className="px-4">
              {empty}
            </div>
          </div>
        ) : (
          abilities.map((ability) => (
            <TableRow key={ability.identifier} ability={ability} />
          ))
        )}
      </div>
    </div>
  );
}
