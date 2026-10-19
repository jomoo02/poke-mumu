import type { Poke } from '@/_entities/poke';

interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  // 여섯 능력치의 합 (종족값)
  total: number;
}

// 포켓몬 + 검색(영문·일본어 이름)·정렬(폼 순서)·종족값
interface BaseStatsPoke extends Poke {
  nameEn: string;
  nameJa: string;
  // 같은 도감 번호 안에서의 폼 순서 (기본 폼 1)
  sortOrder: number;
  stats: BaseStats;
}

type StatKey = keyof BaseStats;

// 테이블·리스트에 보여주는 순서: 종족값 → 게임 표시 순서
const STAT_KEYS = [
  'total',
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
] as const satisfies readonly StatKey[];

// 정렬 메뉴·스크린리더에 쓰는 이름
const STAT_LABEL: Record<StatKey, string> = {
  // 여섯 능력치의 합. 화면 이름은 '총합' (뱃지·머리글·정렬 이름)
  total: '총합',
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  specialAttack: '특수공격',
  specialDefense: '특수방어',
  speed: '스피드',
};

// 테이블 머리글·리스트처럼 폭이 좁은 곳에 쓰는 이름 (게임 커뮤니티에서 흔히 쓰는 줄임말)
const STAT_SHORT_LABEL: Record<StatKey, string> = {
  ...STAT_LABEL,
  specialAttack: '특공',
  specialDefense: '특방',
};

export type { BaseStats, BaseStatsPoke, StatKey };

export { STAT_KEYS, STAT_LABEL, STAT_SHORT_LABEL };
