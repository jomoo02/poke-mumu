'use client';

import { useState } from 'react';
import type { Poke } from '@/app/entities/poke/model';
import { SelectTrigger } from '@radix-ui/react-select';
import FormPoke from './form-poke';
import { Select, SelectContent } from '@/app/shared/ui/select';
import { ChevronsUpDown } from 'lucide-react';

interface FormsProps {
  pokes: Poke[];
  initialPoke: string;
}

export default function Forms({ pokes, initialPoke }: FormsProps) {
  const [selectedFormIndex, setSelectedFormIndex] = useState(() =>
    pokes.findIndex(({ pokeKey }) => pokeKey === initialPoke),
  );
  const selectedPoke = pokes[selectedFormIndex];
  console.log(pokes);
  return (
    <Select>
      <SelectTrigger asChild>
        <button className="w-full flex items-center px-6 py-4 border border-border rounded-2xl">
          <FormPoke key={1} poke={selectedPoke} />
          <ChevronsUpDown className="size-5 text-muted-foreground" />
        </button>
      </SelectTrigger>
      <SelectContent className="rounded-2xl" position="popper">
        <div className="w-full px-6 py-2 grid gap-4 ">
          {pokes.map((poke) => (
            <FormPoke poke={poke} key={poke.pokeKey} />
          ))}
        </div>
      </SelectContent>
    </Select>
    // <Popover>
    //   <PopoverTrigger className="w-full bg-accent" asChild>
    //     <button
    //       className="border border-border rounded-2xl px-6 py-4 relative"
    //       id="text2"
    //     >
    //       {' '}
    //       <FormPoke poke={selectedPoke} />
    //     </button>
    //   </PopoverTrigger>
    //   <PopoverContent align="start">
    //     <div className="w-full">
    //       {' '}
    //       {pokes.map((poke) => (
    //         <FormPoke poke={poke} key={poke.pokeKey} />
    //       ))}
    //     </div>
    //   </PopoverContent>
    // </Popover>
  );
}
