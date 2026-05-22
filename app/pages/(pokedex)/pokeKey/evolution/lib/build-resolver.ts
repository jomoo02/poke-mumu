import { getItemNameKo } from '../config/item';
import { getLocationNameKo } from '../config/location';
import { type RefResolvers, fallback } from '../lib/ref-resolver';

import type { MoveRef } from '../api/move-name';
import type { PokeRef } from '../api/poke';

interface BuildArgs {
  moves: Record<string, MoveRef>;
  pokes: Record<string, PokeRef>;
}

export function buildResolvers({ moves, pokes }: BuildArgs): RefResolvers {
  return {
    item: (key) => ({ label: getItemNameKo(key) }), // detail page 생기면 href 추가
    move: (key) => {
      const found = moves[key];
      if (!found) return fallback(key);
      return { label: found.nameKo, href: `/move/${key}` };
    },
    poke: (key) => {
      const found = pokes[key];
      if (!found) return fallback(key);
      return {
        label: found.nameKo,
        href: `/pokedex/${key}`,
      };
    },
    location: (key) => ({
      label: getLocationNameKo(key),
      extra: 'location',
    }),
  };
}
