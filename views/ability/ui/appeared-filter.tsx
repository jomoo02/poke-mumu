import { cn } from '@/shared/lib/cn';
import { Checkbox } from '@/shared/ui/checkbox';
import { Button } from '@/shared/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/filed';

interface AppearedFilterProps {
  selectedAppearedGens: Set<number>;
  resetFilter: () => void;
  toggleAppearedGen: (gen: number) => void;
  appearedGens: number[];
  variant?: 'desktop' | 'mobile';
}

export default function AppearedFilter({
  selectedAppearedGens,
  toggleAppearedGen,
  resetFilter,
  appearedGens,
  variant = 'desktop',
}: AppearedFilterProps) {
  return (
    <div>
      <div
        id="filter-header"
        className="pb-6 border-b flex justify-between items-center"
      >
        <div className="text-xl font-bold">필터</div>
        <Button
          variant={'ghost'}
          onClick={resetFilter}
          className="text-base h-9 px-3"
        >
          초기화
        </Button>
      </div>
      <div className="py-6">
        <div className="text-lg font-semibold">등장</div>
        <FieldSet>
          <FieldGroup className="gap-y-3 py-4">
            {appearedGens.map((gen) => (
              <Field
                key={gen}
                orientation="horizontal"
                className={cn(
                  variant === 'desktop' && 'gap-x-2.5',
                  variant === 'mobile' && 'gap-x-3',
                  'px-1',
                )}
              >
                <Checkbox
                  checked={selectedAppearedGens.has(gen)}
                  id={`gen-${gen}`}
                  name={`gen-${gen}`}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleAppearedGen(gen)}
                />
                <FieldLabel
                  htmlFor={`gen-${gen}`}
                  className="text-base font-medium cursor-pointer"
                >
                  {gen}세대
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}
