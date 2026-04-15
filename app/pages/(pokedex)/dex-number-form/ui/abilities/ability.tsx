import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
} from '@/app/shared/ui/card';
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from '@/app/shared/ui/item';
import { type AbilitiyView } from '../../model';
import { Badge } from '@/app/shared/ui/badge';

interface AbilityProps {
  ability: AbilitiyView;
}

export default function Ability({ ability }: AbilityProps) {
  const { isHidden, flavorText, name } = ability;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {name}
          {isHidden && <Badge variant={'secondary'}>숨겨진 특성</Badge>}
        </CardTitle>
        <CardDescription className="text-base"> {flavorText}</CardDescription>
      </CardHeader>
    </Card>
  );
}
