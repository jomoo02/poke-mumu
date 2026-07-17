import { cn } from '@/shared/lib/cn';
import { Checkbox } from '@/shared/ui/checkbox';
import { Button } from '@/shared/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Toggle } from '@/shared/ui/toggle';
import { RotateCwIcon } from 'lucide-react';

interface AppearedFilterProps {
  selectedAppearedGens: Set<number>;
  resetFilter: () => void;
  toggleAppearedGen: (gen: number) => void;
  appearedGens: number[];
  variant?: 'desktop' | 'mobile';
  isChampions: boolean;
  toggleChampions: (on: boolean) => void;
}

export default function AppearedFilter({
  selectedAppearedGens,
  toggleAppearedGen,
  resetFilter,
  appearedGens,
  isChampions,
  toggleChampions,
  variant = 'desktop',
}: AppearedFilterProps) {
  const isActive = selectedAppearedGens.size > 0 || isChampions;
  return (
    <div>
      <div
        id={`filter-header-${variant}`}
        className="pb-5 border-b flex justify-between items-center"
      >
        <div className="text-xl font-bold">필터</div>
        <Button
          variant={'ghost'}
          disabled={!isActive}
          onClick={resetFilter}
          className=" h-7.5 -my-0.75 px-2 active:bg-muted rounded-lg gap-1.5 -mx-2"
        >
          <RotateCwIcon className="size-3.5" />
          초기화
        </Button>
      </div>
      <div className="py-5 border-b">
        <div className="text-lg font-semibold">등장</div>
        {variant === 'desktop' ? (
          <FieldSet>
            <FieldGroup className="gap-y-3 py-4">
              {appearedGens.map((gen) => (
                <Field
                  key={gen}
                  orientation="horizontal"
                  className={cn('gap-x-2.5 px-1 py-0.5')}
                >
                  <Checkbox
                    checked={selectedAppearedGens.has(gen)}
                    id={`gen-${gen}-${variant}`}
                    name={`gen-${gen}-${variant}`}
                    className="cursor-pointer"
                    onCheckedChange={() => toggleAppearedGen(gen)}
                  />
                  <FieldLabel
                    htmlFor={`gen-${gen}-${variant}`}
                    className="text-base font-medium cursor-pointer"
                  >
                    {gen}세대
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        ) : (
          <div className="flex flex-wrap gap-3 py-3">
            {appearedGens.map((gen) => (
              <Toggle
                pressed={selectedAppearedGens.has(gen)}
                onPressedChange={() => toggleAppearedGen(gen)}
                variant={'outline'}
                key={gen}
                className="cursor-pointer dark:aria-pressed:bg-muted min-w-18.5"
              >
                {gen}세대
              </Toggle>
            ))}
          </div>
        )}
      </div>
      <div className="py-5">
        <div className="text-lg font-semibold">분류</div>
        {variant === 'desktop' ? (
          <FieldSet>
            <FieldGroup className="gap-y-3 py-4">
              <Field
                orientation="horizontal"
                className={cn('gap-x-2.5 px-1 py-0.5')}
              >
                <Checkbox
                  checked={isChampions}
                  id={`champions-check`}
                  name={`champions-check`}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleChampions(!!!isChampions)}
                />
                <FieldLabel
                  htmlFor={`champions-check`}
                  className="text-base font-medium cursor-pointer dark:aria-pressed:bg-muted"
                >
                  챔피언스
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        ) : (
          <div className="flex flex-wrap gap-3 py-3">
            <Toggle
              pressed={isChampions}
              onPressedChange={() => toggleChampions(!!!isChampions)}
              variant={'outline'}
              className="cursor-pointer "
            >
              챔피언스
            </Toggle>
          </div>
        )}
      </div>
    </div>
  );
}
