'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../../_shared/supabase/adminClient';
import { fail, ok, type ActionResult } from '../../_shared/lib/result';
import {
  championsMoveUpsertSchema,
  type ChampionsMoveUpsertInput,
} from '../_model/schema';
import { flattenZodError } from '../_model/validation';

/**
 * champions_move 삽입/수정. base_move_id 유니크 → 충돌 시 UPDATE.
 * (없으면 master 프리필값이 클라이언트에서 채워져 들어오고, pp만 신규 입력.)
 */
export async function upsertChampionsMove(
  input: ChampionsMoveUpsertInput,
  identifier: string,
): Promise<ActionResult<{ id: number }>> {
  const parsed = championsMoveUpsertSchema.safeParse(input);
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
    power: d.power,
    pp: d.pp,
    accuracy: d.accuracy,
    priority: d.priority,
    effect_chance: d.effectChance,
    target_id: d.targetId,
    description: d.description,
  };

  // base_move_id 존재 여부로 UPDATE / INSERT 분기(유니크 제약 우회 안전).
  const { data: existing, error: findError } = await supabase
    .from('champions_move')
    .select('id')
    .eq('base_move_id', d.baseMoveId)
    .maybeSingle();
  if (findError) {
    return fail({ _: `조회 실패: ${findError.message}` });
  }

  const mutation = existing
    ? supabase
        .from('champions_move')
        .update(row)
        .eq('id', (existing as { id: number }).id)
        .select('id')
        .single()
    : supabase.from('champions_move').insert(row).select('id').single();

  const { data, error } = await mutation;
  if (error) {
    return fail({ _: `저장 실패: ${error.message}` });
  }

  revalidatePath(`/admin/move-identifier/${identifier}`);
  return ok({ id: Number((data as { id: number }).id) });
}
