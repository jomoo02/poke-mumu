import { type Type } from '@/app/entities/type/model';

export interface TypeDefenseDto {
  attacker: Type;
  effectiveness: number;
}

export interface TypeDefenseView {
  multiple: string;
  description: string;
  color: string;
  types: Type[];
}

const multiple = [4, 2, 0.5, 0.25, 0] as const;

type Multiple = (typeof multiple)[number];

const labels: Record<Multiple, string> = {
  0: '효과 없음',
  0.25: '효과가 매우 별로',
  0.5: '효과가 별로',
  2: '효과가 굉장함',
  4: '효과가 매우 굉장함',
};

const colors: Record<Multiple, string> = {
  0: 'secondary',
  0.25: 'blue',
  0.5: 'blue',
  2: 'red',
  4: 'red',
};

const adaptTypeDefenseView = (typeDefenses: TypeDefenseDto[]) => {
  return multiple
    .map((v) => ({
      multiple: `${v}`,
      description: labels[v],
      color: colors[v],
      types: typeDefenses
        .filter((item) => item.effectiveness === v)
        .map((item) => item.attacker),
    }))
    .filter(({ types }) => types.length > 0);
};

export { adaptTypeDefenseView };
