'use client';

import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronsUpDown } from 'lucide-react';

import {
  SelectTrigger,
  SelectItem,
  SelectItemIndicator,
} from '@radix-ui/react-select';

import { Select, SelectContent, SelectSeparator } from '@/app/shared/ui/select';
import { type Poke } from '@/app/entities/poke/model';

import FormPoke from './form-poke';
import FormSelectItem from './form-select-item';

interface FormsProps {
  pokes: Poke[];
  initialPoke: string;
  dexNumber: number | string;
}

export default function Forms({ pokes, initialPoke, dexNumber }: FormsProps) {
  const selectedPoke = pokes.find((poke) => poke.pokeKey === initialPoke);

  // const router = useRouter();

  // if (pokes.length === 1) {
  //   return (
  //     <div className="w-full flex items-center px-6 py-4 border border-border rounded-2xl shadow-sm shadow-border">
  //       <FormPoke poke={selectedPoke} />
  //     </div>
  //   );
  // }

  return (
    <div className="flex overflow-auto">
      <div className="flex gap-1 bg-muted rounded-md p-1">
        {pokes.map((poke) => (
          <FormSelectItem
            key={poke.pokeKey}
            poke={poke}
            className={
              poke.pokeKey === selectedPoke?.pokeKey
                ? 'bg-white rounded-sm'
                : 'text-muted-foreground hover:text-foreground'
            }
          />
        ))}
      </div>
    </div>
  );
}
