'use client';

import type { BaseStatsPoke } from '../../model/base-stats-poke';
import type { NameLanguage } from '../../model/name-language';
import type { PokeSort, SortKey } from '../../model/poke-sort';

import StatTableHead from './stat-table-head';
import StatTableRow from './stat-table-row';
import { TABLE_VARS } from './table-layout';

interface StatTableProps {
  // 현재 페이지 포켓몬
  pokes: BaseStatsPoke[];
  sortState: PokeSort;
  language: NameLanguage;
  onSort: (sortKey: SortKey) => void;
}

/**
 * 넓은 본문(@5xl 이상)의 10열 표. 번호·이름·능력치 머리글로 정렬한다.
 * 좁은 본문은 StatCards (둘 다 그리고 본문 폭으로 하나만 보인다)
 */
export default function StatTable({
  pokes,
  sortState,
  language,
  onSort,
}: StatTableProps) {
  return (
    <div role="table" style={TABLE_VARS} className="w-full">
      <StatTableHead sortState={sortState} onSort={onSort} />
      <div role="rowgroup" className="isolate">
        {pokes.map((poke) => (
          <StatTableRow key={poke.pokeKey} poke={poke} language={language} />
        ))}
      </div>
    </div>
  );
}
