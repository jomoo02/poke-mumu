import { ArrowDownIcon, ArrowUpIcon, DotIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/shared/ui/card';

import { groupNaturesByMode } from '../model/nature-list-grid';
import { getStatLabelKo, type Nature } from '../model/nature';
import type { SortMode } from '../model/useSortNature';

interface NatureListGridProps {
  natures: Nature[];
  sortMode: SortMode;
}

export default function NatureListGrid({
  natures,
  sortMode,
}: NatureListGridProps) {
  const grouppedNatures = groupNaturesByMode(natures, sortMode);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {grouppedNatures.map(({ title, natures }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-0 divide-y">
            {natures.map((nature) => (
              <Nature key={nature.identifier} nature={nature} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface NatureProps {
  nature: Nature;
}

function Nature({ nature }: NatureProps) {
  const { ko, en, ja, increase, decrease } = nature;

  return (
    <div className="flex flex-col gap-y-1.5 py-3 first:pt-0 last:pb-0">
      <div className="flex gap-x-3 gap-y-1">
        <div className="font-medium">{ko}</div>
        <div className="flex items-center gap-x-1 text-md text-foreground/80">
          <span>{en}</span>
          <DotIcon className="size-3.5" />
          <span>{ja}</span>
        </div>
      </div>

      <div className="flex items-center">
        {increase && (
          <div className="flex items-center gap-x-1">
            <span>{getStatLabelKo(increase)}</span>
            <ArrowUpIcon className="size-4.5 text-red-400 dark:text-red-400" />
          </div>
        )}
        {increase && decrease && (
          <div className="text-foreground/50 mx-1.5">/</div>
        )}

        {decrease && (
          <div className="flex items-center gap-x-1 ">
            <span>{getStatLabelKo(decrease)}</span>
            <ArrowDownIcon className="size-4.5 text-blue-400 dark:text-blue-400" />
          </div>
        )}
        {!increase && !decrease && <div>변화 없음</div>}
      </div>
    </div>
  );
}
