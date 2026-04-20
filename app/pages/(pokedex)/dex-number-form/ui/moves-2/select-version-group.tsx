import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

interface SelectVersionGroupProps {
  versionGroups: { id: number; label: string }[];
  versionGroup: number | undefined;
  onChange: (id: number) => void;
}

export default function SelectVersionGroup({
  versionGroup,
  versionGroups,
  onChange,
}: SelectVersionGroupProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {versionGroups.map((vg) => (
        <Button
          onClick={() => onChange(vg.id)}
          variant={'outline'}
          key={vg.id}
          className={cn(
            versionGroup === vg.id
              ? 'bg-muted dark:bg-input hover:dark:bg-input hover:bg-muted'
              : '',
          )}
        >
          {vg.label}
        </Button>
      ))}
    </div>
  );
}
