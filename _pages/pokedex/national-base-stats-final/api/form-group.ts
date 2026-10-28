import { createClient } from '@/_shared/lib/supabase/client';

import type { FormGroup } from '../model/form-group';

// 모습 필터 선택지. 순서는 sort_order
export const getFormGroups = async (): Promise<FormGroup[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_group')
    .select('identifier, nameKo:name_ko, nameEn:name_en, nameJa:name_ja')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch form groups: ${error.message}`);
  }

  return data;
};
