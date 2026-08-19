import { z } from 'zod';
import { CHANGE_LOG_FIELDS } from '../../_shared/pokemon/moveEnums';
import { ZA_MACHINE_TYPES, ZA_VARIANTS } from '../../_shared/pokemon/moveTarget';

/** '' → null, 숫자 문자열 → number, null 허용. 빈값은 0과 구분해 null. */
const nullableInt = z
  .union([z.number(), z.string(), z.null()])
  .transform((v) => {
    if (v === '' || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : Math.trunc(n);
  });

const requiredInt = z
  .union([z.number(), z.string()])
  .transform((v) => Math.trunc(Number(v)))
  .refine((n) => Number.isFinite(n), '정수 필요');

const nullableText = z
  .union([z.string(), z.null()])
  .transform((v) => {
    if (v === null || v === undefined) return null;
    const s = v.trim();
    return s === '' ? null : s;
  });

/** '' | null → null, 그 외 → Number()(소수 보존, double 컬럼용). */
const nullableFloat = z
  .union([z.number(), z.string(), z.null()])
  .transform((v) => {
    if (v === '' || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  });

const requiredText = z
  .union([z.string(), z.null()])
  .transform((v) => (v === null || v === undefined ? '' : v.trim()))
  .refine((s) => s.length > 0, '필수 입력');

/* --------------------------------- 5.2 change_log --------------------------------- */

export const changeLogUpsertSchema = z.object({
  id: z.number().int().positive().optional(),
  moveId: requiredInt,
  versionGroupId: requiredInt,
  field: z.enum(CHANGE_LOG_FIELDS),
  oldValue: nullableText,
  newValue: nullableText,
});

export const changeLogDeleteSchema = z.object({
  id: z.number().int().positive(),
});

export type ChangeLogUpsertInput = z.input<typeof changeLogUpsertSchema>;

/* -------------------------------- 5.5 champions_move ------------------------------- */

export const championsMoveUpsertSchema = z.object({
  baseMoveId: requiredInt,
  identifier: z.string().min(1),
  nameKo: nullableText,
  nameEn: nullableText,
  nameJa: nullableText,
  typeId: nullableInt,
  damageClassId: nullableInt,
  power: nullableInt,
  pp: nullableInt,
  accuracy: nullableInt,
  priority: z
    .union([z.number(), z.string()])
    .transform((v) => Math.trunc(Number(v)))
    .refine((n) => Number.isFinite(n), '우선도 정수 필요'),
  effectChance: nullableInt,
  targetId: nullableInt,
  description: nullableText,
});

export type ChampionsMoveUpsertInput = z.input<typeof championsMoveUpsertSchema>;

/* ----------------------------- 5.6 champions_poke_move ---------------------------- */

export const addChampionsPokeMovesSchema = z.object({
  moveId: requiredInt,
  pokeKeys: z
    .array(z.string().min(1))
    .transform((keys) => Array.from(new Set(keys.map((k) => k.trim()).filter(Boolean))))
    .refine((keys) => keys.length > 0, '추가할 포켓몬이 없습니다.'),
});

export const removeChampionsPokeMoveSchema = z.object({
  id: z.number().int().positive(),
});

/* --------------------------------- 5.1 move (master) ------------------------------- */

export const updateMoveSchema = z.object({
  id: requiredInt,
  nameKo: requiredText,
  nameEn: requiredText,
  nameJa: requiredText,
  typeId: requiredInt,
  damageClassId: nullableInt,
  power: nullableInt,
  pp: nullableInt,
  accuracy: nullableInt,
  priority: requiredInt,
  effectChance: nullableInt,
  targetId: requiredInt, // move.target_id NOT NULL
  isContact: z.union([z.boolean(), z.null()]).transform((v) => v ?? null),
  description: requiredText, // move.description NOT NULL
});

export type UpdateMoveInput = z.input<typeof updateMoveSchema>;

/* ----------------------------- 5.3 legends_arceus (LA) ---------------------------- */

const laTriple = z.object({
  standard: nullableInt,
  agile: nullableInt,
  strong: nullableInt,
});

export const legendsArceusUpsertSchema = z.object({
  baseMoveId: requiredInt,
  identifier: z.string().min(1),
  nameKo: nullableText,
  nameEn: nullableText,
  nameJa: nullableText,
  typeId: nullableInt,
  damageClassId: nullableInt,
  pp: nullableInt,
  description: nullableText,
  power: laTriple,
  accuracy: laTriple,
  actionSpeedSelf: laTriple,
  actionSpeedTarget: laTriple,
  effectChance: laTriple,
  effectTurns: laTriple,
  effectNote: nullableText,
  effectRecoil: laTriple,
  effectHeal: laTriple,
});

export type LegendsArceusUpsertInput = z.input<typeof legendsArceusUpsertSchema>;

/* ------------------------------- 5.4 legends_za (ZA) ------------------------------ */

export const legendsZaUpsertSchema = z.object({
  baseMoveId: requiredInt,
  zaVariant: z.enum(ZA_VARIANTS),
  identifier: z.string().min(1),
  nameKo: requiredText,
  nameEn: requiredText,
  nameJa: requiredText,
  description: requiredText,
  typeId: requiredInt,
  damageClassId: requiredInt,
  power: nullableInt,
  cooldown: nullableInt,
  pp: nullableInt,
  duration: nullableInt,
  framesWindUp: nullableInt,
  framesExec: nullableInt,
  rangeMin: nullableFloat,
  rangeMax: nullableFloat,
  rangeEff: nullableFloat,
  machineType: z
    .union([z.string(), z.null()])
    .transform((v) => {
      if (v === null || v === undefined) return null;
      const t = v.trim();
      return t === '' ? null : t;
    })
    .refine(
      (v) => v === null || (ZA_MACHINE_TYPES as readonly string[]).includes(v),
      'machine_type는 TM/HM/TR 중 하나여야 합니다.',
    ),
  machineNumber: nullableInt,
  effectChance: nullableInt,
  effectRecoil: nullableInt,
  effectHeal: nullableInt,
});

export type LegendsZaUpsertInput = z.input<typeof legendsZaUpsertSchema>;

/** effect_chance/recoil/heal 전 변형 일괄 적용용 부분 스키마. */
export const zaSharedEffectSchema = z.object({
  baseMoveId: requiredInt,
  effectChance: nullableInt,
  effectRecoil: nullableInt,
  effectHeal: nullableInt,
});
