import { type Ability } from '@/app/entities/ability/model';

interface AbilityView extends Ability {
  gen: number | null;
  nameEn: string;
  nameJa: string | null;
}

export { type AbilityView };
