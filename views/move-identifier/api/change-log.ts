import { createClient } from '@/shared/lib/supabase/client';

export const getMoveChangeLog = async (moveId: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('move_change_log')
    .select(
      `
        id,
        field,
        oldValue:old_value,
        newValue:new_value,
        versionGroup:version_group!version_group_id (
          generation,
          identifier,
          nameKo:name_ko
        )
      `,
    )
    .eq('move_id', moveId);

  if (error) {
    console.error(error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
};
