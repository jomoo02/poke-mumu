import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

interface SelectGenProps {
  gen: number | undefined;
  gens: number[];
  onChange: (v: number) => void;
}

export default function SelectGen({ gen, gens, onChange }: SelectGenProps) {
  return (
    <div className="inline-flex bg-muted p-1 rounded-4xl gap-1.5">
      {gens.map((curGen) => (
        <Button
          onClick={() => onChange(curGen)}
          variant={'ghost'}
          key={curGen}
          className={cn(
            'opacity-50  h-9 px-4 ',
            gen === curGen
              ? 'bg-background dark:bg-input hover:bg-background dark:hover:bg-input  opacity-100 shadow-xs'
              : 'hover:opacity-100 ',
          )}
        >
          {curGen}세대
        </Button>
      ))}
    </div>
  );
}
