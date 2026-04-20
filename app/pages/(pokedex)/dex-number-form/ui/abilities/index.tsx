import { Badge } from '@/app/shared/ui/badge';
import {
  Section,
  SectionBorder,
  SectionTitle,
  SectionContent,
  SectionDescription,
} from '../section';

import { type AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
  name: string;
}

export default function Abilities({ abilities, name }: AbilitiesProps) {
  const description = `${name}의 특성`;
  return (
    <Section>
      <SectionBorder />
      <SectionTitle>특성</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
      <SectionContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {abilities.map((ability) => (
          <Ability key={ability.name} ability={ability} />
        ))}
      </SectionContent>
    </Section>
  );
}
