import { type Ability } from '@/app/entities/ability/model';

interface AbilityView extends Ability {
  isHidden: boolean;
  slot: number | null;
}

export { type AbilityView };
