interface Type {
  id: number;
  identifier: string;
  nameKo: string;
}

// 타입 목록 페이지, 필터처럼 추가 정보가 필요한 곳
interface TypeDetail extends Type {
  generation: number;
  damageClassId: number | null;
}

// 게임 표시 순서
const TYPE_IDENTIFIERS = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
  'unknown',
] as const;

type TypeIdentifier = (typeof TYPE_IDENTIFIERS)[number];

const isTypeIdentifier = (identifier: string): identifier is TypeIdentifier =>
  (TYPE_IDENTIFIERS as readonly string[]).includes(identifier);

// unknown은 아이콘 이미지가 없다
const getTypeIconSrc = (identifier: string): string | null =>
  isTypeIdentifier(identifier) && identifier !== 'unknown'
    ? `/type/${identifier}.png`
    : null;

export type { Type, TypeDetail, TypeIdentifier };

export { TYPE_IDENTIFIERS, isTypeIdentifier, getTypeIconSrc };
