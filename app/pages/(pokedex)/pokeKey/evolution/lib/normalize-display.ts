import type { EvolutionCondition } from '../model';
import type { RefType } from './parse-display';

const CONDITION_KEY_REF_TYPE: Record<string, RefType> = {
  'held-item': 'item',
  area: 'location',
  location: 'location',
  known_move: 'move',
  party_species: 'poke',
  trade_species: 'poke',
};

// bare [[xxx]] 만 매칭. [[type:xxx]]는 콜론 때문에 자동으로 제외됨
const BARE_REF = /\[\[([a-z0-9-]+)\]\]/g;

export function normalizeDisplay(
  display: string,
  conditions: EvolutionCondition[],
): string {
  return display.replace(BARE_REF, (full, key: string) => {
    const matched = conditions.find((c) => c.value === key);
    if (!matched) return full;
    const type = CONDITION_KEY_REF_TYPE[matched.key];
    return type ? `[[${type}:${key}]]` : full;
  });
}
