import { createClient } from '@/shared/lib/supabase/client';

export const getVersionGroupContent = async (versionGroup: string) => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_group')
    .select(
      `
        nameKo:name_ko,
        content:version_group_content (
          description
        )
      `,
    )
    .eq('identifier', versionGroup)
    .maybeSingle();

  if (error) {
    console.error(`entities getVersionGroupContent: ${error.message}`);
    return { nameKo: '...', description: null };
  }

  if (!data) {
    return { nameKo: '...', description: null };
  }

  return {
    nameKo: data.nameKo,
    description: data.content?.description ?? null,
  };
};

export const getRegions = async (versionGroup: string) => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('dex_region')
    .select(
      `
        regionKo:region_ko,
        identifier,
        version_group!inner (
          identifier
        )
      `,
    )
    .eq('version_group.identifier', versionGroup)
    .order('order_index', { ascending: true });

  if (error) {
    console.error(`entities getRegions: ${error.message}`);
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
};

export const getPrimaryRegion = async (versionGroup: string) => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('dex_region')
    .select(
      `
        identifier,
        isPrimary:is_primary,
        version_group!inner (
          identifier
        )
      `,
    )
    .eq('version_group.identifier', versionGroup)
    .order('order_index', { ascending: true });

  if (error) {
    console.error(`entities getPrimaryRegion: ${error.message}`);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (data.find(({ isPrimary }) => isPrimary) ?? data[0]).identifier;
};
