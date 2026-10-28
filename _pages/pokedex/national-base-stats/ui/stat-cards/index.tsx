import type { BaseStatsPoke } from '../../model/base-stats-poke';
import type { NameLanguage } from '../../model/name-language';
import type { PokeSort } from '../../model/sort';

import StatCard from './stat-card';

interface StatCardsProps {
  // 현재 페이지 포켓몬
  pokes: BaseStatsPoke[];
  sortState: PokeSort;
  language: NameLanguage;
}

/**
 * 좁은 본문(@5xl 미만)의 2줄 카드 목록. 머리글이 없어 정렬은 결과 줄의 정렬 시트에서 한다.
 * data-sort(지금 정렬 기준)를 카드가 CSS로 읽어 정렬 중인 칸을 칠한다
 */
export default function StatCards({ pokes, sortState, language }: StatCardsProps) {
  return (
    <ul data-sort={sortState.sort} className="group/cards">
      {pokes.map((poke) => (
        <StatCard key={poke.pokeKey} poke={poke} language={language} />
      ))}
    </ul>
  );
}
