'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../../_shared/supabase/adminClient';
import { createAnonClient } from '../../_shared/supabase/anonClient';
import { fail, ok, type ActionResult } from '../../_shared/lib/result';
import {
  adaptPokeSearch,
  type PokeSearchDbRow,
} from '../../_entities/move/adapter';
import type { PokeSearchResult } from '../../_entities/move/types';
import {
  addChampionsPokeMovesSchema,
  removeChampionsPokeMoveSchema,
} from '../_model/schema';
import { flattenZodError } from '../_model/validation';

/** PostgREST or() 구문/ILIKE 와일드카드를 깨는 문자를 제거. */
function sanitize(query: string): string {
  return query.replace(/[,()%*\\]/g, '').trim();
}

/**
 * 포켓몬 검색(읽기, anon). name_ko / name_en / poke_key ILIKE, 상위 20건, sort_order ASC.
 */
export async function searchPoke(query: string): Promise<PokeSearchResult[]> {
  const q = sanitize(query ?? '');
  if (q.length === 0) return [];

  const supabase = createAnonClient();
  const pattern = `%${q}%`;
  const { data, error } = await supabase
    .from('poke')
    .select('poke_key, name_ko, name_en, dex_number, sprite, form_id')
    .or(`name_ko.ilike.${pattern},name_en.ilike.${pattern},poke_key.ilike.${pattern}`)
    .order('sort_order', { ascending: true })
    .limit(20);

  if (error || !data) return [];
  return (data as unknown as PokeSearchDbRow[]).map(adaptPokeSearch);
}

/**
 * champions_poke_move 다중 삽입. ON CONFLICT (poke_key, move_id) DO NOTHING.
 * 반환: { inserted, skipped }.
 */
export async function addChampionsPokeMoves(
  moveId: number,
  pokeKeys: string[],
  identifier: string,
): Promise<ActionResult<{ inserted: number; skipped: number }>> {
  const parsed = addChampionsPokeMovesSchema.safeParse({ moveId, pokeKeys });
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }
  const { moveId: mId, pokeKeys: keys } = parsed.data;

  const supabase = createAdminClient();
  const rows = keys.map((poke_key) => ({ poke_key, move_id: mId }));

  const { data, error } = await supabase
    .from('champions_poke_move')
    .upsert(rows, { onConflict: 'poke_key,move_id', ignoreDuplicates: true })
    .select('id');

  if (error) {
    return fail({ _: `추가 실패: ${error.message}` });
  }

  const inserted = (data ?? []).length;
  const skipped = keys.length - inserted;

  revalidatePath(`/admin/move-identifier/${identifier}`);
  return ok({ inserted, skipped });
}

/** champions_poke_move 하드 삭제(id). */
export async function removeChampionsPokeMove(
  id: number,
  identifier: string,
): Promise<ActionResult<void>> {
  const parsed = removeChampionsPokeMoveSchema.safeParse({ id });
  if (!parsed.success) {
    return fail(flattenZodError(parsed.error));
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('champions_poke_move')
    .delete()
    .eq('id', parsed.data.id);

  if (error) {
    return fail({ _: `삭제 실패: ${error.message}` });
  }

  revalidatePath(`/admin/move-identifier/${identifier}`);
  return ok(undefined);
}
