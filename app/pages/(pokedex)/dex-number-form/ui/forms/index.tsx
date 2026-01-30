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

  const router = useRouter();

  if (!selectedPoke) {
    return (
      <div className="w-full flex items-center px-6 py-4 border border-border rounded-2xl shadow-sm shadow-border bg-muted h-24.5" />
    );
  }

  if (pokes.length === 1) {
    return (
      <div className="w-full flex items-center px-6 py-4 border border-border rounded-2xl shadow-sm shadow-border">
        <FormPoke poke={selectedPoke} />
      </div>
    );
  }

  return (
    <Select
      value={initialPoke}
      onValueChange={(next) => {
        router.push(`/pokedex/${dexNumber}/${next}`);
      }}
    >
      <SelectTrigger asChild className=" bg-transparent outline-none">
        <button className="w-full flex items-center px-6 py-4 border border-border rounded-2xl hover:bg-accent active:bg-accent shadow-sm shadow-border gap-2">
          <FormPoke poke={selectedPoke} />
          <ChevronsUpDown className="size-5.5 text-muted-foreground" />
        </button>
      </SelectTrigger>
      <SelectContent
        className="rounded-2xl shadow-sm shadow-border z-10 bg-card"
        position="popper"
      >
        <div className="w-full p-2 grid">
          {pokes.map((poke, index) => (
            <Fragment key={poke.pokeKey}>
              {index > 0 && <SelectSeparator className="mx-1" />}
              <SelectItem
                key={poke.pokeKey}
                value={poke.pokeKey}
                className=" px-4 active:bg-accent outline-hidden flex rounded-xl select-none relative cursor-default focus:bg-accent w-full justify-between items-center"
              >
                <FormSelectItem poke={poke} key={poke.pokeKey} />
                <SelectItemIndicator>
                  <Check className="size-4" />
                </SelectItemIndicator>
              </SelectItem>
            </Fragment>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
