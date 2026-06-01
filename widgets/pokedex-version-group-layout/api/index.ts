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
    console.error(error.message);
    return '...';
  }

  if (!data) {
    return '...';
  }

  return data.nameKo;
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
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
};

export const getRegionKo = async (versionGroup: string, region: string) => {
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
    console.error(error);
    return '...';
  }

  if (!data) {
    return '...1';
  }

  return data.regionKo;
};
