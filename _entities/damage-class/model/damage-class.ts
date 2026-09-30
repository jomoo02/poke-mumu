interface DamageClass {
  id: number;
  identifier: string;
  nameKo: string;
}

// 게임 표시 순서 (DB id 순서와 다르다: 1 status, 2 physical, 3 special)
const DAMAGE_CLASS_IDENTIFIERS = ['physical', 'special', 'status'] as const;

type DamageClassIdentifier = (typeof DAMAGE_CLASS_IDENTIFIERS)[number];

const isDamageClassIdentifier = (
  identifier: string,
): identifier is DamageClassIdentifier =>
  (DAMAGE_CLASS_IDENTIFIERS as readonly string[]).includes(identifier);

const getDamageClassIconSrc = (identifier: string): string | null =>
  isDamageClassIdentifier(identifier)
    ? `/damage-class/${identifier}.png`
    : null;

export type { DamageClass, DamageClassIdentifier };

export {
  DAMAGE_CLASS_IDENTIFIERS,
  isDamageClassIdentifier,
  getDamageClassIconSrc,
};
