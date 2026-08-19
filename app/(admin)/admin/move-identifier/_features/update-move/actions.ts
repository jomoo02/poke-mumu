'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../../_shared/supabase/adminClient';
import { fail, ok, type ActionResult } from '../../_shared/lib/result';
import { updateMoveSchema, type UpdateMoveInput } from '../_model/schema';
import { flattenZodError } from '../_model/validation';

/**
 * move(master) 수정. identifier는 읽기전용이라 갱신 대상 아님.
 */
export async function updateMove(
  input: UpdateMoveInput,
  identifier: string,
): Promise<ActionResult<{ id: number }>> {
  const parsed = updateMoveSchema.safeParse(input);
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }
  const d = parsed.data;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('move')
    .update({
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
      is_contact: d.isContact,
      description: d.description,
    })
    .eq('id', d.id)
    .select('id')
    .single();

  if (error) {
    return fail({ _: `저장 실패: ${error.message}` });
  }

  revalidatePath(`/admin/move-identifier/${identifier}`);
  return ok({ id: Number((data as { id: number }).id) });
}
