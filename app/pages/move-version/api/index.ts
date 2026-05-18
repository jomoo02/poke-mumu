import { createClient } from '@/app/shared/lib/supabase/client';

import { type VersionGroupView } from '../model';

export const getAllVersionGroups = async (): Promise<VersionGroupView[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_group')
    .select(
      `
        id,
        identifier,
        nameKo:name_ko,
        generation,
        sortOrder:sort_order
      `,
    )
    .order('sort_order', { ascending: true });

  if (error) throw error;

  return data ?? [];
};
