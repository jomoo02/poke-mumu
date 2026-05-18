import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from '@/app/shared/ui/card';
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from '@/app/shared/ui/item';
import { type AbilityView } from '../../model';
import { Badge } from '@/app/shared/ui/badge';
import Link from 'next/link';

interface AbilityProps {
  ability: AbilityView;
}

export default function Ability({ ability }: AbilityProps) {
  const { isHidden, flavorText, nameKo, identifier } = ability;
  return (
    <div className="flex flex-col gap-1.5 border rounded-4xl p-6 lg:max-w-lg bg-card">
      <div className="flex gap-1.5">
        <Link href={`/ability/${identifier}`}>
          <h3 className="text-xl font-medium">{nameKo}</h3>
        </Link>

        {isHidden && <Badge variant={'secondary'}>숨겨진 특성</Badge>}
      </div>

      <p className="text-muted-foreground">{flavorText}</p>
    </div>
    // <Card>
    //   <CardHeader>
    //     <CardTitle>
    //       {nameKo}
    //       {isHidden && <Badge variant={'secondary'}>숨겨진 특성</Badge>}
    //     </CardTitle>
    //     <CardDescription className="text-base"> {flavorText}</CardDescription>
    //   </CardHeader>
    //   <CardFooter className="h-full flex-1 flex items-end justify-end">
    //     <Link
    //       href={`/ability/${identifier}`}
    //       className="px-2 flex justify-center items-center text-primary font-semibold text-sm rounded-4xl"
    //     >
    //       자세히 보기
    //     </Link>
    //   </CardFooter>
    // </Card>
  );
}
