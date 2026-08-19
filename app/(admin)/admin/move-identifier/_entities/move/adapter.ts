import { toNullableNumber, toNumber } from '../../_shared/lib/coerce';
import { CHANGE_LOG_FIELDS, type ChangeLogField } from '../../_shared/pokemon/moveEnums';
import { ZA_VARIANTS, type ZaVariant } from '../../_shared/pokemon/moveTarget';
import type {
  ChampionsMoveRow,
  ChampionsPokeMoveRow,
  ChangeLogRow,
  LegendsArceusRow,
  LegendsZaRow,
  MoveMaster,
  PokeSearchResult,
  VersionMoveRefRow,
} from './types';

/* PostgREST row 형태(snake_case). 숫자 컬럼은 문자열로 올 수 있어 Number() 강제. */

export interface MoveDbRow {
  id: number | string;
  identifier: string;
  name_ko: string;
  name_en: string;
  name_ja: string;
  type_id: number | string;
  damage_class_id: number | string | null;
  power: number | string | null;
  pp: number | string | null;
  accuracy: number | string | null;
  priority: number | string | null;
  effect_chance: number | string | null;
  target_id: number | string | null;
  description: string | null;
  is_contact: boolean | null;
  legacy_id: number | string | null;
}

export function adaptMaster(row: MoveDbRow): MoveMaster {
  return {
    id: toNumber(row.id),
    identifier: row.identifier,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    nameJa: row.name_ja,
    typeId: toNumber(row.type_id),
    damageClassId: toNullableNumber(row.damage_class_id),
    power: toNullableNumber(row.power),
    pp: toNullableNumber(row.pp),
    accuracy: toNullableNumber(row.accuracy),
    priority: toNumber(row.priority),
    effectChance: toNullableNumber(row.effect_chance),
    targetId: toNullableNumber(row.target_id),
    description: row.description,
    isContact: row.is_contact ?? null,
    legacyId: toNullableNumber(row.legacy_id),
  };
}

export interface ChangeLogDbRow {
  id: number | string;
  move_id: number | string;
  version_group_id: number | string;
  field: string;
  old_value: string | null;
  new_value: string | null;
}

function coerceField(field: string): ChangeLogField {
  return (CHANGE_LOG_FIELDS as readonly string[]).includes(field)
    ? (field as ChangeLogField)
    : CHANGE_LOG_FIELDS[0];
}

export function adaptChangeLog(row: ChangeLogDbRow): ChangeLogRow {
  return {
    id: toNumber(row.id),
    moveId: toNumber(row.move_id),
    versionGroupId: toNumber(row.version_group_id),
    field: coerceField(row.field),
    oldValue: row.old_value,
    newValue: row.new_value,
  };
}

export interface ChampionsMoveDbRow {
  id: number | string;
  base_move_id: number | string;
  identifier: string;
  name_ko: string | null;
  name_en: string | null;
  name_ja: string | null;
  type_id: number | string | null;
  damage_class_id: number | string | null;
  power: number | string | null;
  pp: number | string | null;
  accuracy: number | string | null;
  priority: number | string | null;
  effect_chance: number | string | null;
  target_id: number | string | null;
  description: string | null;
}

export function adaptChampionsMove(row: ChampionsMoveDbRow): ChampionsMoveRow {
  return {
    id: toNumber(row.id),
    baseMoveId: toNumber(row.base_move_id),
    identifier: row.identifier,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    nameJa: row.name_ja,
    typeId: toNullableNumber(row.type_id),
    damageClassId: toNullableNumber(row.damage_class_id),
    power: toNullableNumber(row.power),
    pp: toNullableNumber(row.pp),
    accuracy: toNullableNumber(row.accuracy),
    priority: toNumber(row.priority),
    effectChance: toNullableNumber(row.effect_chance),
    targetId: toNullableNumber(row.target_id),
    description: row.description,
  };
}

interface PokeJoin {
  name_ko: string;
  name_en: string;
  dex_number: number | string;
  sprite: string | null;
}

export interface ChampionsPokeMoveDbRow {
  id: number | string;
  poke_key: string;
  move_id: number | string;
  poke: PokeJoin | PokeJoin[] | null;
}

function firstJoin(poke: ChampionsPokeMoveDbRow['poke']): PokeJoin | null {
  if (!poke) return null;
  return Array.isArray(poke) ? (poke[0] ?? null) : poke;
}

export function adaptChampionsPokeMove(
  row: ChampionsPokeMoveDbRow,
): ChampionsPokeMoveRow {
  const p = firstJoin(row.poke);
  return {
    id: toNumber(row.id),
    pokeKey: row.poke_key,
    moveId: toNumber(row.move_id),
    nameKo: p?.name_ko ?? row.poke_key,
    nameEn: p?.name_en ?? '',
    dexNumber: toNumber(p?.dex_number),
    sprite: p?.sprite ?? null,
  };
}

export interface PokeSearchDbRow {
  poke_key: string;
  name_ko: string;
  name_en: string;
  dex_number: number | string;
  sprite: string | null;
  form_id: number | string | null;
}

export function adaptPokeSearch(row: PokeSearchDbRow): PokeSearchResult {
  return {
    pokeKey: row.poke_key,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    dexNumber: toNumber(row.dex_number),
    sprite: row.sprite,
    formLabel: row.form_id !== null && row.form_id !== undefined ? String(row.form_id) : null,
  };
}

/* ------------------------------ version_move (ref) ----------------------------- */

export interface VersionMoveDbRow {
  version_group_id: number | string;
  name_ko: string;
  type_id: number | string;
  damage_class_id: number | string | null;
  power: number | string | null;
  pp: number | string | null;
  accuracy: number | string | null;
  priority: number | string | null;
  effect_chance: number | string | null;
  target_id: number | string | null;
  is_usable: boolean;
}

export function adaptVersionMove(row: VersionMoveDbRow): VersionMoveRefRow {
  return {
    versionGroupId: toNumber(row.version_group_id),
    nameKo: row.name_ko,
    typeId: toNumber(row.type_id),
    damageClassId: toNullableNumber(row.damage_class_id),
    power: toNullableNumber(row.power),
    pp: toNullableNumber(row.pp),
    accuracy: toNullableNumber(row.accuracy),
    priority: toNullableNumber(row.priority),
    effectChance: toNullableNumber(row.effect_chance),
    targetId: toNullableNumber(row.target_id),
    isUsable: row.is_usable,
  };
}

/* ------------------------------ legends_arceus (LA) ---------------------------- */

type LaCol = 'standard' | 'agile' | 'strong';

/** row 에서 `${prefix}_${col}` 3개를 LaTriple 로 묶는다. */
function triple(
  row: Record<string, number | string | null>,
  prefix: string,
): { standard: number | null; agile: number | null; strong: number | null } {
  return {
    standard: toNullableNumber(row[`${prefix}_standard`]),
    agile: toNullableNumber(row[`${prefix}_agile`]),
    strong: toNullableNumber(row[`${prefix}_strong`]),
  };
}

// 위 3열 컬럼 접미사(가독성용, 미사용 방지 참조)
export const LA_COLS: readonly LaCol[] = ['standard', 'agile', 'strong'];

export type LegendsArceusDbRow = Record<string, number | string | null> & {
  id: number | string;
  base_move_id: number | string | null;
  identifier: string;
  name_ko: string | null;
  name_en: string | null;
  name_ja: string | null;
  type_id: number | string | null;
  damage_class_id: number | string | null;
  pp: number | string | null;
  description: string | null;
  effect_note: string | null;
};

export function adaptLegendsArceus(row: LegendsArceusDbRow): LegendsArceusRow {
  return {
    id: toNumber(row.id),
    baseMoveId: toNumber(row.base_move_id),
    identifier: row.identifier,
    nameKo: (row.name_ko as string | null) ?? null,
    nameEn: (row.name_en as string | null) ?? null,
    nameJa: (row.name_ja as string | null) ?? null,
    typeId: toNullableNumber(row.type_id),
    damageClassId: toNullableNumber(row.damage_class_id),
    pp: toNullableNumber(row.pp),
    description: (row.description as string | null) ?? null,
    power: triple(row, 'power'),
    accuracy: triple(row, 'accuracy'),
    actionSpeedSelf: triple(row, 'action_speed_self'),
    actionSpeedTarget: triple(row, 'action_speed_target'),
    effectChance: triple(row, 'effect_chance'),
    effectTurns: triple(row, 'effect_turns'),
    effectNote: (row.effect_note as string | null) ?? null,
    effectRecoil: triple(row, 'effect_recoil'),
    effectHeal: triple(row, 'effect_heal'),
  };
}

/* -------------------------------- legends_za (ZA) ------------------------------ */

export interface LegendsZaDbRow {
  id: number | string;
  za_variant: string;
  base_move_id: number | string;
  legacy_move_id: number | string;
  identifier: string;
  name_ko: string;
  name_en: string;
  name_ja: string;
  description: string;
  type_id: number | string;
  damage_class_id: number | string;
  power: number | string | null;
  cooldown: number | string | null;
  pp: number | string | null;
  duration: number | string | null;
  frames_wind_up: number | string | null;
  frames_exec: number | string | null;
  range_min: number | string | null;
  range_max: number | string | null;
  range_eff: number | string | null;
  machine_type: string | null;
  machine_number: number | string | null;
  version_group_id: number | string;
  effect_chance: number | string | null;
  effect_recoil: number | string | null;
  effect_heal: number | string | null;
}

function coerceZaVariant(v: string): ZaVariant {
  return (ZA_VARIANTS as readonly string[]).includes(v) ? (v as ZaVariant) : 'base';
}

export function adaptLegendsZa(row: LegendsZaDbRow): LegendsZaRow {
  return {
    id: toNumber(row.id),
    zaVariant: coerceZaVariant(row.za_variant),
    baseMoveId: toNumber(row.base_move_id),
    legacyMoveId: toNumber(row.legacy_move_id),
    identifier: row.identifier,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    nameJa: row.name_ja,
    description: row.description,
    typeId: toNumber(row.type_id),
    damageClassId: toNumber(row.damage_class_id),
    power: toNullableNumber(row.power),
    cooldown: toNullableNumber(row.cooldown),
    pp: toNullableNumber(row.pp),
    duration: toNullableNumber(row.duration),
    framesWindUp: toNullableNumber(row.frames_wind_up),
    framesExec: toNullableNumber(row.frames_exec),
    rangeMin: toNullableNumber(row.range_min),
    rangeMax: toNullableNumber(row.range_max),
    rangeEff: toNullableNumber(row.range_eff),
    machineType: row.machine_type,
    machineNumber: toNullableNumber(row.machine_number),
    versionGroupId: toNumber(row.version_group_id),
    effectChance: toNullableNumber(row.effect_chance),
    effectRecoil: toNullableNumber(row.effect_recoil),
    effectHeal: toNullableNumber(row.effect_heal),
  };
}
