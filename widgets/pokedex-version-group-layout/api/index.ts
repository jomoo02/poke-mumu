import { createClient } from '@/shared/lib/supabase/client';

export const getVersionGroupKo = async (versionGroup: string) => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_group')
    .select(`nameKo:name_ko`)
    .eq('identifier', versionGroup)
    .maybeSingle();

  if (error) {
    console.error(`widgents getVersionGroupKo: ${error.message}`);
    return '...';
  }

  if (!data) {
    return '...';
  }

  return data.nameKo;
};

export const getVersionGroupContent = async (versionGroup: string) => {
  // 'use cache';

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
    console.error(`widgets getVersionGroupContent: ${error.message}`);
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
        versionGroup:version_group!inner (
          identifier,
          nameKo:name_ko
        ),
        regionKo:region_ko,
        identifier
      `,
    )
    .eq('version_group.identifier', versionGroup)
    .order('order_index', { ascending: true });

  if (error) {
    console.error(`widgents getRegions: ${error.message}`);
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
    console.error(`widgets getPrimaryRegion: ${error.message}`);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (data.find(({ isPrimary }) => isPrimary) ?? data[0]).identifier;
};

export const getRegionKo = async (versionGroup: string, region: string) => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('dex_region')
    .select(
      `
        versionGroup:version_group!inner (
          identifier,
          nameKo:name_ko
        ),
        regionKo:region_ko
      `,
    )
    .eq('version_group.identifier', versionGroup)
    .eq('identifier', region)
    .maybeSingle();

  if (error) {
    console.error(`widgets getRegionKo: ${error.message}`);
    return '...';
  }

  if (!data) {
    return '...1';
  }

  return data.regionKo;
};
