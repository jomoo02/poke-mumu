import { type Ability } from '@/app/entities/ability/model';

interface AbilityView extends Ability {
  gen: number | null;
}

export { type AbilityView };
