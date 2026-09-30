// 클라이언트에서도 안전한 공개 API (서버 전용 api는 index.server.ts)

// model
export type { Type, TypeDetail, TypeIdentifier } from './model/type';
export {
  TYPE_IDENTIFIERS,
  isTypeIdentifier,
  getTypeIconSrc,
} from './model/type';

export type { TypeColor } from './model/type-color';
export { getTypeColor } from './model/type-color';

export type {
  Multiplier,
  TypeEffectiveness,
  EffectivenessGroup,
} from './model/type-effectiveness';
export {
  MULTIPLIERS,
  toMultiplier,
  groupByMultiplier,
} from './model/type-effectiveness';

// ui
export { TypeIcon } from './ui/type-icon';
export { TypeIconLabel } from './ui/type-icon-label';
