'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../../_shared/supabase/adminClient';
import { fail, ok, type ActionResult } from '../../_shared/lib/result';
import { ZA_LEGACY_OFFSET } from '../../_shared/pokemon/moveTarget';
import {
  legendsZaUpsertSchema,
  zaSharedEffectSchema,
  type LegendsZaUpsertInput,
} from '../_model/schema';
import { flattenZodError } from '../_model/validation';

const ZA_VERSION_GROUP_ID = 22;

/**
 * version_move_legends_za 삽입/수정(변형별). (base_move_id, za_variant) 유니크
 * 제약이 없어 존재확인 후 UPDATE / INSERT 분기.
 * legacy_move_id = move.legacy_id + 변형 오프셋(base 0 / plus 1000 / rogue 2000) 자동 계산.
 */
export async function upsertLegendsZa(
  input: LegendsZaUpsertInput,
  identifier: string,
): Promise<ActionResult<{ id: number }>> {
  const parsed = legendsZaUpsertSchema.safeParse(input);
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }
  const d = parsed.data;
  const supabase = createAdminClient();

  // base move 의 legacy_id 조회 → legacy_move_id 계산
  const { data: moveRow, error: moveError } = await supabase
    .from('move')
    .select('legacy_id')
    .eq('id', d.baseMoveId)
    .single();
  if (moveError || !moveRow) {
    return fail({ _: `base move 조회 실패: ${moveError?.message ?? 'not found'}` });
  }
  const legacyBase = Number((moveRow as { legacy_id: number | null }).legacy_id);
  if (!Number.isFinite(legacyBase)) {
    return fail({ _: 'base move 의 legacy_id 가 없어 legacy_move_id 를 계산할 수 없습니다.' });
  }
  const legacyMoveId = legacyBase + ZA_LEGACY_OFFSET[d.zaVariant];

  const row = {
    za_variant: d.zaVariant,
    base_move_id: d.baseMoveId,
    legacy_move_id: legacyMoveId,
    identifier: d.identifier,
    name_ko: d.nameKo,
    name_en: d.nameEn,
    name_ja: d.nameJa,
    description: d.description,
    type_id: d.typeId,
    damage_class_id: d.damageClassId,
    power: d.power,
    cooldown: d.cooldown,
    pp: d.pp,
    duration: d.duration,
    frames_wind_up: d.framesWindUp,
    frames_exec: d.framesExec,
    range_min: d.rangeMin,
    range_max: d.rangeMax,
    range_eff: d.rangeEff,
    machine_type: d.machineType,
    machine_number: d.machineNumber,
    version_group_id: ZA_VERSION_GROUP_ID,
    effect_chance: d.effectChance,
    effect_recoil: d.effectRecoil,
    effect_heal: d.effectHeal,
  };

  const { data: existing, error: findError } = await supabase
    .from('version_move_legends_za')
    .select('id')
    .eq('base_move_id', d.baseMoveId)
    .eq('za_variant', d.zaVariant)
    .maybeSingle();
  if (findError) {
    return fail({ _: `조회 실패: ${findError.message}` });
  }

  const mutation = existing
    ? supabase
        .from('version_move_legends_za')
        .update(row)
        .eq('id', (existing as { id: number }).id)
        .select('id')
        .single()
    : supabase
        .from('version_move_legends_za')
        .insert(row)
        .select('id')
        .single();

  const { data, error } = await mutation;
  if (error) {
    return fail({ _: `저장 실패: ${error.message}` });
  }

  revalidatePath(`/admin/move-identifier/${identifier}`);
  return ok({ id: Number((data as { id: number }).id) });
}

/**
 * 기술 고유 효과값(effect_chance/recoil/heal)을 존재하는 전 변형(base/plus/rogue)에 일괄 적용.
 */
export async function applyZaSharedEffect(
  input: { baseMoveId: number; effectChance: number | null; effectRecoil: number | null; effectHeal: number | null },
  identifier: string,
): Promise<ActionResult<{ updated: number }>> {
  const parsed = zaSharedEffectSchema.safeParse(input);
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }
  const d = parsed.data;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('version_move_legends_za')
    .update({
      effect_chance: d.effectChance,
      effect_recoil: d.effectRecoil,
      effect_heal: d.effectHeal,
    })
    .eq('base_move_id', d.baseMoveId)
    .select('id');

  if (error) {
    return fail({ _: `일괄 적용 실패: ${error.message}` });
  }

  revalidatePath(`/admin/move-identifier/${identifier}`);
  return ok({ updated: (data ?? []).length });
}
