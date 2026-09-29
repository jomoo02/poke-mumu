import { isTypeIdentifier, type TypeIdentifier } from '../type';

interface TypeColor {
  // 아이콘, 배지 배경
  solid: string;
  // 카드 호버 등 옅은 배경
  soft: string;
}

// Tailwind가 클래스를 추출할 수 있도록 전체 문자열로 작성
const TYPE_COLOR = {
  normal: {
    solid: 'bg-normal dark:bg-normal/80',
    soft: 'bg-normal/10 dark:bg-normal/20',
  },
  fire: {
    solid: 'bg-fire dark:bg-fire/80',
    soft: 'bg-fire/10 dark:bg-fire/20',
  },
  water: {
    solid: 'bg-water dark:bg-water/80',
    soft: 'bg-water/10 dark:bg-water/20',
  },
  grass: {
    solid: 'bg-grass dark:bg-grass/80',
    soft: 'bg-grass/10 dark:bg-grass/20',
  },
  electric: {
    solid: 'bg-electric dark:bg-electric/80',
    soft: 'bg-electric/10 dark:bg-electric/20',
  },
  ice: {
    solid: 'bg-ice dark:bg-ice/80',
    soft: 'bg-ice/10 dark:bg-ice/20',
  },
  fighting: {
    solid: 'bg-fighting dark:bg-fighting/80',
    soft: 'bg-fighting/10 dark:bg-fighting/20',
  },
  poison: {
    solid: 'bg-poison dark:bg-poison/80',
    soft: 'bg-poison/10 dark:bg-poison/20',
  },
  ground: {
    solid: 'bg-ground dark:bg-ground/80',
    soft: 'bg-ground/10 dark:bg-ground/20',
  },
  flying: {
    solid: 'bg-flying dark:bg-flying/80',
    soft: 'bg-flying/10 dark:bg-flying/20',
  },
  psychic: {
    solid: 'bg-psychic dark:bg-psychic/80',
    soft: 'bg-psychic/10 dark:bg-psychic/20',
  },
  bug: {
    solid: 'bg-bug dark:bg-bug/80',
    soft: 'bg-bug/10 dark:bg-bug/20',
  },
  rock: {
    solid: 'bg-rock dark:bg-rock/80',
    soft: 'bg-rock/10 dark:bg-rock/20',
  },
  ghost: {
    solid: 'bg-ghost dark:bg-ghost/80',
    soft: 'bg-ghost/10 dark:bg-ghost/20',
  },
  dragon: {
    solid: 'bg-dragon dark:bg-dragon/80',
    soft: 'bg-dragon/10 dark:bg-dragon/20',
  },
  dark: {
    solid: 'bg-dark dark:bg-dark/80',
    soft: 'bg-dark/10 dark:bg-dark/20',
  },
  steel: {
    solid: 'bg-steel dark:bg-steel/80',
    soft: 'bg-steel/10 dark:bg-steel/20',
  },
  fairy: {
    solid: 'bg-fairy dark:bg-fairy/80',
    soft: 'bg-fairy/10 dark:bg-fairy/20',
  },
  unknown: {
    solid: 'bg-unknown dark:bg-unknown/80',
    soft: 'bg-unknown/10 dark:bg-unknown/20',
  },
} satisfies Record<TypeIdentifier, TypeColor>;

// DB identifier는 string이라 모르는 값은 unknown 색으로
const getTypeColor = (identifier: string): TypeColor =>
  TYPE_COLOR[isTypeIdentifier(identifier) ? identifier : 'unknown'];

export type { TypeColor };

export { getTypeColor };
