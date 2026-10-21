import { TYPE_IDENTIFIERS, type Type, type TypeDetail } from '@/_entities/type';

// 타입 필터에서 고를 수 있는 값 (게임 표시 순서).
// 선택지(toFilterTypes)와 URL 검증(parsePokeFilter)이 함께 쓰는 기준
// 포켓몬 타입으로 unknown은 쓰이지 않아 뺀다
const FILTERABLE_TYPES: readonly string[] = TYPE_IDENTIFIERS.filter(
  (identifier) => identifier !== 'unknown',
);

// 타입 필터 선택지: 목록에 있는 것만 게임 표시 순서로.
// 클라이언트로 넘기는 값이라 필터에 필요한 필드만 남긴다
const toFilterTypes = (types: readonly TypeDetail[]): Type[] =>
  types
    .filter(({ identifier }) => FILTERABLE_TYPES.includes(identifier))
    .sort(
      (a, b) =>
        FILTERABLE_TYPES.indexOf(a.identifier) -
        FILTERABLE_TYPES.indexOf(b.identifier),
    )
    .map(({ id, identifier, nameKo }) => ({ id, identifier, nameKo }));

export { FILTERABLE_TYPES, toFilterTypes };
