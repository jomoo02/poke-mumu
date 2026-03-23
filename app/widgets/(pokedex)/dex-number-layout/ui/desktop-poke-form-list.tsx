import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';

import { type PokeFormView } from '../model';

interface DesktopPokeFormsListProps {
  pokeForms: PokeFormView[];
  form: string;
}

export default function DesktopPokeFormList({
  pokeForms,
  form,
}: DesktopPokeFormsListProps) {
  return (
    <nav className="flex flex-col bg-transparent p-6 xl:pl-10 rounded-lg gap-1.5">
      {pokeForms.map((poke) => (
        <PokeForm
          key={poke.pokeKey}
          pokeForm={poke}
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
        'shrink-0 font-medium transition-colors py-1 text-sm',
        isActive
          ? 'text-primary font-semibold'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      {...rest}
    >
      {label}
    </Link>
  );
}
