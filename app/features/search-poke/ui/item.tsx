import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { TypeBadge } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { cn } from '@/app/shared/lib/cn';
import { useSearchContext } from '../provider/search.context';
import { SearchPoke } from '../model';
import { Button } from '@/app/shared/ui/button';

interface ItemProps {
  item: SearchPoke;
  isActive: boolean;
}

export default function Item({ item, isActive }: ItemProps) {
  const { selectPoke } = useSearchContext();

  const { dexNumber, form, name, type1, type2, pokeKey } = item;

  const href = `/pokedex/${dexNumber}/${pokeKey}`;
  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    // <Link
    //   href={href}
    //   className={cn('flex py-2 px-4 rounded-xl gap-4', isActive && 'bg-accent')}
    // >
    <Button
      variant="ghost"
      onClick={() => selectPoke(item)}
      className={cn(
        'flex py-2 px-4 rounded-xl gap-4 w-full h-full ',
        isActive && 'bg-accent',
      )}
    >
      <PokeSprite poke={item} />
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col flex-1 text-left">
          <span className="text-sm text-muted-foreground font-medium">
            {formattedDexNumber}
          </span>
          <span className="font-medium text-base">{name}</span>
          <span className="text-sm h-5 text-muted-foreground font-medium">
            {form}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {type1 && <TypeBadge type={type1} className="w-16" />}
          {type2 && <TypeBadge type={type2} className="w-16" />}
        </div>
      </div>
    </Button>
  );
}
