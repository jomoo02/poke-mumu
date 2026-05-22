import { ChevronDown, ChevronRight } from 'lucide-react';
import type { EvolutionDetail } from '../model';
import { EvolutionDisplay } from './evolution-display';
import { RefResolvers } from '../lib/ref-resolver';
interface EvolutionArrowProps {
  details: EvolutionDetail[];
  resolvers: RefResolvers;
}

export function EvolutionArrow({ details, resolvers }: EvolutionArrowProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-1 text-muted-foreground">
      <ChevronDown className="size-5 lg:hidden" aria-hidden />
      <ChevronRight className="hidden size-5 lg:block" aria-hidden />
      {details.length > 0 && (
        <ul className="flex flex-col items-center gap-0.5 text-sm leading-tight">
          {details.map((d, i) => (
            <li key={i} className="text-center text-foreground/80">
              <EvolutionDisplay display={d.display} resolvers={resolvers} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
