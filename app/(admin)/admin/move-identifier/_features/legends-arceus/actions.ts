'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../../_shared/supabase/adminClient';
import { fail, ok, type ActionResult } from '../../_shared/lib/result';
import {
  legendsArceusUpsertSchema,
  type LegendsArceusUpsertInput,
} from '../_model/schema';
import { flattenZodError } from '../_model/validation';

const LA_VERSION_GROUP_ID = 20;

type Triple = { standard: number | null; agile: number | null; strong: number | null };

/** LaTriple → {prefix}_standard/agile/strong 컬럼으로 펼친다. */
function spread(prefix: string, t: Triple): Record<string, number | null> {
  return {
    [`${prefix}_standard`]: t.standard,
    [`${prefix}_agile`]: t.agile,
    [`${prefix}_strong`]: t.strong,
  };
}

/**
 * version_move_legends_arceus 삽입/수정. base_move_id 유니크 제약이 없어
 * 존재확인 후 UPDATE / INSERT 분기.
 */
export async function upsertLegendsArceus(
  input: LegendsArceusUpsertInput,
  identifier: string,
): Promise<ActionResult<{ id: number }>> {
  const parsed = legendsArceusUpsertSchema.safeParse(input);
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }
  const d = parsed.data;
  const supabase = createAdminClient();

  const row = {
    base_move_id: d.baseMoveId,
    identifier: d.identifier,
    name_ko: d.nameKo,
    name_en: d.nameEn,
    name_ja: d.nameJa,
    type_id: d.typeId,
    damage_class_id: d.damageClassId,
    pp: d.pp,
    description: d.description,
    version_group_id: LA_VERSION_GROUP_ID,
    effect_note: d.effectNote,
    ...spread('power', d.power),
    ...spread('accuracy', d.accuracy),
    ...spread('action_speed_self', d.actionSpeedSelf),
    ...spread('action_speed_target', d.actionSpeedTarget),
    ...spread('effect_chance', d.effectChance),
    ...spread('effect_turns', d.effectTurns),
    ...spread('effect_recoil', d.effectRecoil),
    ...spread('effect_heal', d.effectHeal),
  };

  const { data: existing, error: findError } = await supabase
    .from('version_move_legends_arceus')
    .select('id')
    .eq('base_move_id', d.baseMoveId)
    .maybeSingle();
  if (findError) {
    return fail({ _: `조회 실패: ${findError.message}` });
  }

  const mutation = existing
    ? supabase
        .from('version_move_legends_arceus')
        .update(row)
        .eq('id', (existing as { id: number }).id)
        .select('id')
        .single()
    : supabase
        .from('version_move_legends_arceus')
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
