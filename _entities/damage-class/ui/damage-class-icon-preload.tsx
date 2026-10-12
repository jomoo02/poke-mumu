import { preload } from 'react-dom';

import {
  DAMAGE_CLASS_IDENTIFIERS,
  getDamageClassIconSrc,
} from '../model/damage-class';

const DAMAGE_CLASS_ICON_SRCS = DAMAGE_CLASS_IDENTIFIERS.map(
  getDamageClassIconSrc,
).filter((src): src is string => src !== null);

// 분류 아이콘을 전부 미리 받는다. 쓰는 곳·이유는 preloadTypeIcons·TypeIconPreload와 같다
export const preloadDamageClassIcons = () => {
  for (const src of DAMAGE_CLASS_ICON_SRCS) {
    preload(src, { as: 'image' });
  }
};

export function DamageClassIconPreload() {
  preloadDamageClassIcons();

  return null;
}
