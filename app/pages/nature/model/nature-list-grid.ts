import type { Nature } from './nature';
import type { SortMode } from './useSortNature';

const STAT_GROUPS = [
  { key: 'attack', label: '공격이' },
  { key: 'defense', label: '방어가' },
  { key: 'specialAttack', label: '특수공격이' },
  { key: 'specialDefense', label: '특수방어가' },
  { key: 'speed', label: '스피드가' },
] as const;

interface NatureGroup {
  title: string;
  natures: Nature[];
}

export const groupNaturesByMode = (
  natures: Nature[],
  mode: SortMode,
): NatureGroup[] => {
  const verb = mode === 'increase' ? '상승' : '하락';

  const directionalGroups = STAT_GROUPS.map(({ key, label }) => ({
    title: `${label} ${verb}하는 성격`,
    natures: natures.filter((nature) => nature[mode] === key),
  }));

  const neutralGroup: NatureGroup = {
    title: '변화가 없는 성격',
    natures: natures.filter((n) => n.increase === null),
  };

  return [...directionalGroups, neutralGroup];
};
