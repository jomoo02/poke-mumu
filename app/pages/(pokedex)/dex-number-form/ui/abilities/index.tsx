import { Fragment } from 'react';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardGroup,
  CardGroupLabel,
  CardItem,
  CardDescription,
} from '@/app/shared/ui/card';

import { Badge } from '@/app/shared/ui/badge';

import { type AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
  name: string;
}

export default function Abilities({ abilities, name }: AbilitiesProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold mb-6 mt-8">특성</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {' '}
        {abilities.map((ability) => (
          <Ability key={ability.name} ability={ability} />
        ))}
      </div>
    </div>
  );
}
