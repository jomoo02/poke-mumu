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
        <div className="font-medium">{nameKo}</div>
        <p className="text-muted-foreground pt-1 text-sm text-pretty break-keep line-clamp-2">
          {flavorText}
        </p>
      </div>
      <ChevronRightIcon className="size-4.5 text-muted-foreground shrink-0" />
    </Link>
  );
}
