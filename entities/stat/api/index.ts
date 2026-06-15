import { createClient } from '@/shared/lib/supabase/client';

import { type StatMeta, STAT_IDENTIFIERS_ROW_MAP } from '../model';

interface StatDto {
  id: number;
  identifier: string;
  name_ko: string;
  name_en: string;
  name_ja: string;
  display_order: number;
}

const adaptStatDto = (dto: StatDto): StatMeta => {
  return {
    id: dto.id,
    identifier: STAT_IDENTIFIERS_ROW_MAP[dto.identifier],
    nameKo: dto.name_ko,
    nameEn: dto.name_en,
    nameJa: dto.name_ja,
    displayOrder: dto.display_order,
  };
};

export const getStatMeta = async (): Promise<StatMeta[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('stat')
    .select('id, identifier, name_ko, name_en, name_ja, display_order')
    .order('display_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch stats: ${error.message}`);
  }

  return (data ?? []).map(adaptStatDto);
};
