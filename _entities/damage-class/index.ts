// 클라이언트에서도 안전한 공개 API (서버 전용 api는 index.server.ts)

// model
export type { DamageClass, DamageClassIdentifier } from './model/damage-class';
export {
  DAMAGE_CLASS_IDENTIFIERS,
  isDamageClassIdentifier,
  getDamageClassIconSrc,
} from './model/damage-class';

export type { DamageClassColor } from './model/damage-class-color';
export { getDamageClassColor } from './model/damage-class-color';

// ui
export { DamageClassIcon } from './ui/damage-class-icon';
export { DamageClassIconLabel } from './ui/damage-class-icon-label';
