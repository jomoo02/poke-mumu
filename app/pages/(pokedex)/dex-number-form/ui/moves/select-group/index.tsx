import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';
import { useState } from 'react';

interface SelectGroupProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  grouped: {
    gen: string;
    values: {
      id: string;
      value: string;
    }[];
  }[];
  selectedVersionGroup: string | undefined;
  selectedGen: number;
}

export default function SelectGroup({
  value,
  onValueChange,
  grouped,
  selectedVersionGroup,
  selectedGen,
}: SelectGroupProps) {
  const [curSelectedGen, setCurSelectedGen] = useState(() => {
    return grouped.find(({ values }) => values.find((v) => v.id === value))
      ?.gen;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div>
        <div className="mb-2">세대</div>
        <div className="flex overflow-auto">
          <div className="flex bg-muted p-1 rounded-lg shadow-sm shadow-muted gap-1">
            {grouped.map(({ gen }) => (
              <Button
                key={gen}
                variant="ghost"
                onClick={() => setCurSelectedGen(gen)}
                className={cn(
                  'py-1.5 px-4',
                  curSelectedGen === gen ? 'bg-card' : 'text-muted-foreground',
                )}
              >
                {gen}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2">버전</div>
        {grouped.map(({ gen, values }) => (
          <div
            key={gen}
            className={cn(
              gen === curSelectedGen ? 'flex overflow-auto' : 'hidden',
            )}
          >
            <div className="bg-muted flex gap-1 rounded-lg p-1">
              {values.map(({ value: v, id }) => (
                <Button
                  key={v}
                  variant="ghost"
                  onClick={() => onValueChange(id)}
                  className={cn(
                    'py-1.5 px-4',
                    value === id ? 'bg-card' : 'text-muted-foreground',
                  )}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl">
        {selectedGen} : {selectedVersionGroup}
      </div>
    </div>
  );
}
