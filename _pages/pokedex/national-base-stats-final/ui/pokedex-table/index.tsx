import type { BaseStatsPoke } from '../../model/base-stats-poke';
import type { NameLanguage } from '../../model/name-language';
import type { PokeSort, SortKey } from '../../model/sort';

import { TABLE_VARS } from './table-layout';
import TableHeader from './table-header';
import TableRow from './table-row';

interface PokedexTableProps {
  pokes: BaseStatsPoke[];
  sortState: PokeSort;
  language: NameLanguage;
  onSort: (sortKey: SortKey) => void;
}

export default function PokedexTable({
  pokes,
  sortState,
  language,
  onSort,
}: PokedexTableProps) {
  return (
    <div role="table" style={TABLE_VARS} className="w-full">
      <TableHeader sortState={sortState} onSort={onSort} />
      <div role="rowgroup" className="isolate">
        {pokes.map((poke) => (
          <TableRow key={poke.pokeKey} poke={poke} language={language} />
        ))}
      </div>
    </div>
  );
}
