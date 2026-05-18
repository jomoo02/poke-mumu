import { Badge } from '@/app/shared/ui/badge';
import {
  Section,
  SectionBorder,
  SectionTitle,
  SectionContent,
  SectionDescription,
} from '../section';

import { type AbilityView } from '../../model';
import Ability from './ability';

interface AbilityListProps {
  abilities: AbilityView[];
  name: string;
}

export default function AbilityList({ abilities, name }: AbilityListProps) {
  const description = `${name}의 특성`;
  return (
    <Section>
      <SectionBorder />
      <SectionTitle>특성</SectionTitle>
      <SectionContent>
        <div className="grid grid-cols-3 gap-6">
          {abilities.map((ability) => (
            <Ability key={ability.identifier} ability={ability} />
          ))}
        </div>
      </SectionContent>
    </Section>
  );
}
