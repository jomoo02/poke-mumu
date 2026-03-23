'use client';

import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';
import { useScrollXToActive } from '@/app/shared/model/use-scroll';

import { type PokeFormView } from '../model';

interface MobilePokeFormsListProps {
  pokeForms: PokeFormView[];
  form: string;
}

export default function MobilePokeFormList({
  pokeForms,
  form,
}: MobilePokeFormsListProps) {
  const scrollRef = useScrollXToActive<HTMLDivElement>(form);

  return (
    <nav
      ref={scrollRef}
      className="w-fit flex bg-accent p-1 overflow-x-auto rounded-lg gap-0.5"
    >
      {pokeForms.map((poke) => (
        <PokeForm
          key={poke.pokeKey}
          pokeForm={poke}
          data-key={poke.pokeKey}
          isActive={form === poke.pokeKey}
        />
      ))}
    </nav>
  );
}

interface PokeFormProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  pokeForm: PokeFormView;
  isActive: boolean;
  className?: string;
}

function PokeForm({ pokeForm, className, isActive, ...rest }: PokeFormProps) {
  const href = `/pokedex/${pokeForm.dexNumber}/${pokeForm.pokeKey}`;
  const label = pokeForm.form ? pokeForm.form : pokeForm.name;

  return (
    <Link
      href={href}
      className={cn(
        'shrink-0 rounded-md font-medium transition-colors px-3 py-1.5 text-sm',
        isActive ? 'bg-background text-foreground' : 'text-muted-foreground',
        className,
      )}
      {...rest}
    >
      {label}
    </Link>
  );
}
