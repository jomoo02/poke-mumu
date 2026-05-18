import { Stat } from '@/app/entities/stat/model';
import { EffortValueView } from '../../model';

interface EffortValuesProps {
  effortValues: EffortValueView[];
  statRows: Stat[];
}

export default function EffortValues({
  effortValues,
  statRows,
}: EffortValuesProps) {
  const view = statRows.map(({ nameKo, identifier }) => {
    const value =
      effortValues.find((ev) => ev.identifier === identifier)?.value ?? null;
    return {
      nameKo,
      identifier,
      value,
    };
  });
  return (
    <div className="">
      <h3 className="text-xl font-semibold">노력치</h3>
      <div className="pt-6 flex justify-center items-center flex-1">
        {' '}
        <div className="grid grid-cols-3 gap-3 ">
          {view.map(({ nameKo, identifier, value }) => (
            <div
              key={identifier}
              className="rounded-4xl size-22 lg:size-24 bg-muted p-4 flex flex-col"
            >
              <div className="text-center text-muted-foreground text-sm">
                {nameKo}
              </div>
              <div className="text-center flex-1 flex items-center justify-center font-medium">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
