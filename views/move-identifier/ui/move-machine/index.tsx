import { useMemo } from 'react';
import { DotIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { cn } from '@/shared/lib/cn';
import type { VersionMove } from '@/entities/move/model';
import { VersionGroupBadge } from '@/entities/version-group/ui/badge';
import {
  getMoveMachinGroups,
  type GenerationMachineGroup,
} from './move-machine.utils';
import {
  PageLayoutSection,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

interface MoveMachinProps {
  versionMoves: VersionMove[];
  className?: string;
}

export default function MoveMachine({
  versionMoves,
  className,
}: MoveMachinProps) {
  const moveMachines = getMoveMachinGroups(versionMoves);

  const description = '버전별 기술머신, 기술레코드 번호';

  return (
    <PageLayoutSection className="mt-12 pt-12 border-t">
      <PageLayoutSectionTitle>기술머신</PageLayoutSectionTitle>
      <div className="grid gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {moveMachines.flatMap((gen) =>
          gen.rows.map((row) => (
            <div
              key={`${gen.generation}-${row.machine}`}
              className="flex flex-col gap-y-2"
            >
              <div className="flex flex-wrap gap-1.5">
                {row.versions.map((v) => (
                  <VersionGroupBadge
                    key={v.identifier}
                    versionGroup={v}
                  ></VersionGroupBadge>
                ))}
              </div>
              <div className="text-md flex items-center gap-1">
                <DotIcon className="size-4" />
                {row.machine}
              </div>
            </div>
          )),
        )}
      </div>
    </PageLayoutSection>
  );
}
