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

// 폼 + 영문·일본어 이름 (이름 표기 언어가 영어·일본어일 때 '이름 (폼)'으로 붙인다. 예: Meowth (Galarian))
interface BaseStatsPokeForm extends PokeForm {
  nameEn: string;
  nameJa: string;
}

interface BaseStatsPoke extends Poke {
  form: BaseStatsPokeForm | null;
  nameEn: string;
  nameJa: string;
  // 같은 도감 번호 안에서의 폼 순서 (기본 폼 1)
  sortOrder: number;
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

// 줄이지 않은 이름: 정렬 시트·결과 줄 정렬 버튼·데스크탑 테이블 머리글·스크린리더
const STAT_LABEL: Record<StatKey, string> = {
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  specialAttack: '특수공격',
  specialDefense: '특수방어',
  speed: '스피드',
  total: '총합',
};

// 줄인 이름: 모바일 카드의 능력치 칸처럼 폭이 좁은 곳 (게임 커뮤니티에서 흔히 쓰는 줄임말)
const STAT_SHORT_LABEL: Record<StatKey, string> = {
  ...STAT_LABEL,
  specialAttack: '특공',
  specialDefense: '특방',
};

export type { BaseStats, BaseStatsPoke, BaseStatsPokeForm, StatKey };

export { STAT_KEYS, STAT_LABEL, STAT_SHORT_LABEL };
