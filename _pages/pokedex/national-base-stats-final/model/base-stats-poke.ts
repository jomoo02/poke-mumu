import type { Poke, PokeForm } from '@/_entities/poke';

interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

// 폼 + 영문·일본어 이름(이름 표기 언어) + 모습 필터 선택지
interface BaseStatsPokeForm extends PokeForm {
  nameEn: string;
  nameJa: string;
  // 모습 필터 선택지 identifier (DB form_group. 예: 'alola'). 모습 필터에 안 잡히는 폼은 null
  group: string | null;
}

interface BaseStatsPoke extends Poke {
  form: BaseStatsPokeForm | null;
  nameEn: string;
  nameJa: string;
  sortOrder: number;
  gen: number | null;
  stats: BaseStats;
}

type StatKey = keyof BaseStats;

// 보여주는 순서: 게임 표시 순서(HP … 스피드) → 총합
// (테이블 열·카드 칸·정렬 시트 모두 이 순서)
const STAT_KEYS = [
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
  'total',
] as const satisfies readonly StatKey[];

const STAT_LABEL: Record<StatKey, string> = {
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  specialAttack: '특수공격',
  specialDefense: '특수방어',
  speed: '스피드',
  total: '총합',
};

const STAT_SHORT_LABEL: Record<StatKey, string> = {
  ...STAT_LABEL,
  specialAttack: '특공',
  specialDefense: '특방',
};

export type { BaseStats, BaseStatsPoke, BaseStatsPokeForm, StatKey };

export { STAT_KEYS, STAT_LABEL, STAT_SHORT_LABEL };
