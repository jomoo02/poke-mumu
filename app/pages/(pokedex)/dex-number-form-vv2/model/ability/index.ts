import { type Ability } from '@/app/entities/ability/model';

export interface AbilitiyView extends Ability {
  slot: number;
  isHidden: boolean;
}

export interface AbilitiyDTO {
  slot: number;
  ability: {
    id: number;
    name: string;
    flavorText: string;
  };
}
export const adaptAbilitiyView = (
  abilities: AbilitiyDTO[] | null,
): AbilitiyView[] => {
  if (!abilities) {
    return [];
  }

  return abilities.map(({ slot, ability }) => ({
    slot,
    isHidden: slot === 3,
    ...ability,
  }));
};
