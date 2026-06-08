import { ArrowDownIcon, ArrowUpIcon, DotIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { cn } from '@/shared/lib/cn';

import { groupNaturesByMode } from './nature-list-grid.utils';
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
        <Card key={title} className={cn(natures.length === 0 && 'opacity-50')}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            {natures.length === 0 ? (
              <>일치하는 성격이 없습니다</>
            ) : (
              <>
                {natures.map((nature) => (
                  <Nature key={nature.identifier} nature={nature} />
                ))}
              </>
            )}
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
    <div className="flex flex-col gap-y-1 py-3.5 bg-muted/50 rounded-2xl px-4">
      <div className="flex gap-x-3 gap-y-1">
        <div className="font-medium ">{ko}</div>
        <div className="flex items-center gap-x-1 text-foreground/70 font-medium text-md">
          <span>{en}</span>
          <DotIcon className="size-4" />
          <span>{ja}</span>
        </div>
      </div>

      <div className="flex items-center text-base">
        {increase && (
          <div className="flex items-center gap-x-1">
            <span>{getStatLabelKo(increase)}</span>
            <ArrowUpIcon className="size-4.5 text-red-500 dark:text-red-400" />
          </div>
        )}
        {increase && decrease && (
          <div className="text-foreground/50 mx-1.5">/</div>
        )}

        {decrease && (
          <div className="flex items-center gap-x-1 ">
            <span>{getStatLabelKo(decrease)}</span>
            <ArrowDownIcon className="size-4.5 text-blue-500 dark:text-blue-400" />
          </div>
        )}
        {!increase && !decrease && <div>변화 없음</div>}
      </div>
    </div>
  );
}
