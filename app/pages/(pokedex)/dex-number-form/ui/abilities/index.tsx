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

interface AbilitiesProps {
  abilities: AbilitiyView[];
  name: string;
}

export default function Abilities({ abilities, name }: AbilitiesProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>특성</CardTitle>
        <CardDescription>{name}의 특성</CardDescription>
      </CardHeader>
      <CardContent>
        {abilities.map((ability, index) => (
          <Fragment key={ability.name}>
            {index > 0 && <div className="w-full h-px bg-border" />}
            <CardGroup className="gap-2">
              <CardGroupLabel className="flex gap-1.5 items-center">
                {ability.name}
                {ability.isHidden && (
                  <Badge variant={'secondary'}>숨겨진 특성</Badge>
                )}
              </CardGroupLabel>
              <CardItem className="text-muted-foreground">
                {ability.flavorText}
              </CardItem>
            </CardGroup>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
