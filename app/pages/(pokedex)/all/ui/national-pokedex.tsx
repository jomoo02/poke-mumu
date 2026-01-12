import { cn } from '@/app/shared/lib/cn';

import { type NationalPokeView } from '../model';
import PokeCard from './poke-card';

export default function NationalDex({ pokes }: { pokes: NationalPokeView[] }) {
  return (
    <div
      className={cn(
        'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity',
        'group-has-data-[state=pending]:opacity-40 group-has-data-[state=pending]:pointer-events-none',
        'max-w-7xl p-6 w-full mx-auto',
      )}
    >
      {pokes.map((poke) => (
        <PokeCard key={poke.id} poke={poke} />
      ))}
    </div>
  );
}
