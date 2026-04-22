import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { TypeBadge, TypeIconV3 } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { cn } from '@/app/shared/lib/cn';
import { useSearchContext } from '../provider/search.context';
import { SearchPoke } from '../model';
import { Button } from '@/app/shared/ui/button';

interface ItemProps {
  item: SearchPoke;
  isActive?: boolean;
}

export default function ItemMobile({ item, isActive }: ItemProps) {
  const { selectPoke } = useSearchContext();

  const { dexNumber, form, name, type1, type2, pokeKey } = item;

  const href = `/pokedex/${dexNumber}/${pokeKey}`;
  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    // <Link
    //   href={href}
    //   onClick={() => selectPoke(item)}
    //   className={cn('flex py-2 px-4 rounded-xl gap-4', isActive && 'bg-accent')}
    // >
    <Button
      variant={'ghost'}
      tabIndex={-1}
      onClick={() => selectPoke(item)}
      className={cn(
        'flex py-2.5 px-3 rounded-4xl gap-4 w-full h-full overflow-hidden bg-card pointer-event cursor-pointer hover:bg-card dark:hover:bg-card active:bg-accent',
      )}
    >
      <PokeSprite poke={item} className="shrink-0" />

      <div className="flex flex-col flex-1 text-left overflow-hidden">
        <span className="text-sm text-muted-foreground font-medium">
          {formattedDexNumber}
        </span>
        <span className="font-medium text-base truncate">{name}</span>
        <span className="text-sm h-5 text-muted-foreground font-medium truncate ">
          {form}
        </span>
      </div>

      <div className="flex flex-col gap-1 shrink-0">
        {type1 && <TypeIconV3 type={type1} />}
        {type2 && <TypeIconV3 type={type2} />}
      </div>
    </Button>
    //  </Link>
  );
}
