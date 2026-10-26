import { TYPE_IDENTIFIERS, type Type, type TypeDetail } from '../type';

// 포켓몬·기술이 실제로 갖는 타입 (게임 표시 순서). unknown(???)은 어떤 포켓몬·기술에도 쓰이지 않는다
const SELECTABLE_TYPE_IDENTIFIERS: readonly string[] = TYPE_IDENTIFIERS.filter(
  (identifier) => identifier !== 'unknown',
);

// 고를 수 있는 타입만 게임 표시 순서로 (DB 조회 순서와 상관없이).
// 클라이언트로 넘기는 값(필터 선택지 등)이라 id·identifier·nameKo만 남긴다
const toSelectableTypes = (types: readonly TypeDetail[]): Type[] =>
  types
    .filter(({ identifier }) =>
      SELECTABLE_TYPE_IDENTIFIERS.includes(identifier),
    )
    .sort(
      (a, b) =>
        SELECTABLE_TYPE_IDENTIFIERS.indexOf(a.identifier) -
        SELECTABLE_TYPE_IDENTIFIERS.indexOf(b.identifier),
    )
    .map(({ id, identifier, nameKo }) => ({ id, identifier, nameKo }));

export { SELECTABLE_TYPE_IDENTIFIERS, toSelectableTypes };
