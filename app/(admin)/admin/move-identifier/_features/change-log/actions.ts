'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../../_shared/supabase/adminClient';
import { fail, ok, type ActionResult } from '../../_shared/lib/result';
import {
  changeLogDeleteSchema,
  changeLogUpsertSchema,
  type ChangeLogUpsertInput,
} from '../_model/schema';
import { flattenZodError } from '../_model/validation';

function revalidate(identifier: string) {
  revalidatePath(`/admin/move-identifier/${identifier}`);
}

/**
 * change_log 추가/수정. id 있으면 UPDATE, 없으면 INSERT.
 * (move_change_log 에는 (move_id,vg,field) 복합 유니크가 없어 upsert 대신 분기.)
 */
export async function upsertChangeLog(
  input: ChangeLogUpsertInput,
  identifier: string,
): Promise<ActionResult<{ id: number }>> {
  const parsed = changeLogUpsertSchema.safeParse(input);
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }
  const { id, moveId, versionGroupId, field, oldValue, newValue } = parsed.data;

  const supabase = createAdminClient();
  const row = {
    move_id: moveId,
    version_group_id: versionGroupId,
    field,
    old_value: oldValue,
    new_value: newValue,
  };

  const query = id
    ? supabase.from('move_change_log').update(row).eq('id', id).select('id').single()
    : supabase.from('move_change_log').insert(row).select('id').single();

  const { data, error } = await query;
  if (error) {
    return fail({ _: `저장 실패: ${error.message}` });
  }

  revalidate(identifier);
  return ok({ id: Number((data as { id: number }).id) });
}

/** change_log 하드 삭제. */
export async function deleteChangeLog(
  id: number,
  identifier: string,
): Promise<ActionResult<void>> {
  const parsed = changeLogDeleteSchema.safeParse({ id });
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('move_change_log')
    .delete()
    .eq('id', parsed.data.id);
  if (error) {
    return fail({ _: `삭제 실패: ${error.message}` });
  }

  revalidate(identifier);
  return ok(undefined);
}
