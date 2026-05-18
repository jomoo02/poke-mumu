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
import { ChevronRightIcon } from 'lucide-react';
interface AbilityProps {
  ability: AbilityView;
}

export default function Ability({ ability }: AbilityProps) {
  const { isHidden, flavorText, nameKo, identifier } = ability;
  return (
    <Link
      href={`/ability/${identifier}`}
      className="px-4 py-3.5 bg-muted/50 dark:bg-muted/50 rounded-2xl flex justify-between items-center gap-x-3.5 hover:bg-muted dark:hover:bg-muted"
    >
      <div className="">
        <div className="text-lg font-medium">{nameKo}</div>
        <p className="text-muted-foreground pt-1 text-md text-pretty break-keep line-clamp-2">
          {flavorText}
        </p>
      </div>

      <ChevronRightIcon className="size-4.5 text-muted-foreground shrink-0" />
    </Link>

    // <div className="px-4 py-3.5 bg-muted/70 rounded-2xl">
    //   <div className="flex gap-1.5 font-medium">
    //     <Link href={`/ability/${identifier}`}>
    //       <h3 className="text-lg">{nameKo}</h3>
    //     </Link>
    //   </div>

    //   <p className="text-muted-foreground pt-1.5 text-sm">{flavorText}</p>
    // </div>
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
