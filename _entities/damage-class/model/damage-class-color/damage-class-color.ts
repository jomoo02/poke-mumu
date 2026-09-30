import {
  isDamageClassIdentifier,
  type DamageClassIdentifier,
} from '../damage-class';

interface DamageClassColor {
  // 아이콘, 배지 배경
  solid: string;
  // 카드 호버 등 옅은 배경
  soft: string;
}

// Tailwind가 클래스를 추출할 수 있도록 전체 문자열로 작성
const DAMAGE_CLASS_COLOR = {
  physical: {
    solid: 'bg-orange-400 dark:bg-orange-400/80',
    soft: 'bg-orange-400/10 dark:bg-orange-400/20',
  },
  special: {
    solid: 'bg-sky-400 dark:bg-sky-400/80',
    soft: 'bg-sky-400/10 dark:bg-sky-400/20',
  },
  status: {
    solid: 'bg-zinc-400 dark:bg-zinc-400/80',
    soft: 'bg-zinc-400/10 dark:bg-zinc-400/20',
  },
} satisfies Record<DamageClassIdentifier, DamageClassColor>;

// DB identifier는 string이라 모르는 값용 색을 따로 둔다
const UNKNOWN_DAMAGE_CLASS_COLOR: DamageClassColor = {
  solid: 'bg-[#4c1d95] dark:bg-[#4c1d95]/90',
  soft: 'bg-[#4c1d95]/10 dark:bg-[#4c1d95]/20',
};

const getDamageClassColor = (identifier: string): DamageClassColor =>
  isDamageClassIdentifier(identifier)
    ? DAMAGE_CLASS_COLOR[identifier]
    : UNKNOWN_DAMAGE_CLASS_COLOR;

export type { DamageClassColor };

export { getDamageClassColor };
