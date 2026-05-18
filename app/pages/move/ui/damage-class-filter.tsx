import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

interface DamageClassFilterProps {
  damageClasses: { identifier: string; nameKo: string; count: number }[];
  activeDamageClasses: Set<string>;
  toggleDamageClass: (identifier: string) => void;
}

export default function DamageClassFilter({
  damageClasses,
  activeDamageClasses,
  toggleDamageClass,
}: DamageClassFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {damageClasses.map((dc) => (
        <Button
          key={dc.identifier}
          type="button"
          variant={'outline'}
          onClick={() => toggleDamageClass(dc.identifier)}
          data-active={activeDamageClasses.has(dc.identifier)}
          className={cn(
            'data-active:bg-muted data-active:hover:bg-muted dark:data-active:bg-input dark:data-active:hover:bg-input',
          )}
        >
          {dc.nameKo}
        </Button>
      ))}
    </div>
  );
}
