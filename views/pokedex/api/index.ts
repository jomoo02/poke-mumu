import { createClient } from '@/shared/lib/supabase/client';

const GENERATIONS = [
  { gen: 1, title: '1세대' },
  { gen: 2, title: '2세대' },
  { gen: 3, title: '3세대' },
  { gen: 4, title: '4세대' },
  { gen: 5, title: '5세대' },
  { gen: 6, title: '6세대' },
  { gen: 7, title: '7세대' },
  { gen: 8, title: '8세대' },
  { gen: 9, title: '9세대' },
] as const;

interface VersionGroupCard {
  href: string;
  identifier: string;
  nameKo: string;
  nameEn: string;
}

export interface GenGroup {
  title: string;
  versionGroups: VersionGroupCard[];
}

/** 기본 도감 = order_index 최소인 region */
const baseRegionOf = <T extends { orderIndex: number }>(regions: T[]) =>
  regions.reduce((min, r) => (r.orderIndex < min.orderIndex ? r : min));

export const getGenGroupedPokedexes = async (): Promise<GenGroup[] | null> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_group')
    .select(
      `
        identifier,
        nameKo:name_ko,
        nameEn:name_en,
        generation,
        sortOrder:sort_order,
        regions:dex_region (
          identifier,
          orderIndex:order_index
        )
      `,
    )
    .order('sort_order');

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  const toCard = (verionGroup: (typeof data)[number]): VersionGroupCard => {
    const base = baseRegionOf(verionGroup.regions);

    return {
      href: `/pokedex/game/${verionGroup.identifier}/${base.identifier}`,
      identifier: verionGroup.identifier,
      nameKo: verionGroup.nameKo,
      nameEn: verionGroup.nameEn,
    };
  };

  return GENERATIONS.map(({ gen, title }) => ({
    title,
    versionGroups: data.filter((vg) => vg.generation === gen).map(toCard),
  }));
};
