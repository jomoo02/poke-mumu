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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
  CardGroupLabel,
  CardItem,
  CardFooter,
} from '@/app/shared/ui/card';

interface AbilityListProps {
  abilities: AbilityView[];
  name: string;
}

export default function AbilityListV2({ abilities, name }: AbilityListProps) {
  const description = `${name}의 특성`;
  const normal = abilities.filter(({ isHidden }) => !isHidden);
  const hidden = abilities.filter(({ isHidden }) => isHidden);
  return (
    <Card>
      <CardHeader>
        <CardTitle>특성</CardTitle>
      </CardHeader>
      <CardContent>
        <CardGroup>
          <CardGroupLabel>일반 특성</CardGroupLabel>
          {normal.map((ability) => (
            <Ability key={ability.identifier} ability={ability} />
          ))}
        </CardGroup>
        {hidden.length > 0 && (
          <CardGroup>
            <CardGroupLabel>숨겨진 특성</CardGroupLabel>
            {hidden.map((ability) => (
              <Ability key={ability.identifier} ability={ability} />
            ))}
          </CardGroup>
        )}
      </CardContent>
    </Card>
  );
}
