import { createClient } from '@/app/shared/lib/supabase/client';

export interface MoveRef {
  nameKo: string;
}

export async function getMoveNamesByKeys(
  keys: string[],
): Promise<Record<string, MoveRef>> {
  'use cache';
  if (keys.length === 0) return {};

  const supabase = createClient();
  const { data, error } = await supabase
    .from('move')
    .select('identifier, name_ko')
    .in('identifier', keys);

  if (error || !data) return {};

  return Object.fromEntries(
    data.map((r) => [r.identifier, { nameKo: r.name_ko }]),
  );
}
