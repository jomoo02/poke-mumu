import { Fragment, useMemo } from 'react';
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

export default function MoveMachineV2({
  versionMoves,
  className,
}: MoveMachinProps) {
  const moveMachines = getMoveMachinGroups(versionMoves);

  const description = '버전별 기술머신, 기술레코드 번호';

  return (
    <PageLayoutSection className="mt-12 pt-12 border-t border bg-card rounded-4xl p-6 h-fit">
      <PageLayoutSectionTitle>기술머신</PageLayoutSectionTitle>
      <div className="pt-3 grid grid-cols-2">
        {moveMachines.map(({ generation, rows }, idx) => (
          <Fragment key={generation}>
            {/* {idx > 0 && (
              <div className="border-b-3 border-dotted w-full h-px my-6" />
            )} */}
            <>
              {rows.map((row, idx2) => (
                <Fragment key={`${generation}-${row.machine}`}>
                  {/* {idx2 > 0 && (
                    <div className="border-b-3 border-dotted w-full h-px my-6" />
                  )} */}
                  <div className="grid  gap-3">
                    <div className="font-medium flex flex-wrap gap-2">
                      {row.versions.map((v) => (
                        <VersionGroupBadge
                          key={v.identifier}
                          versionGroup={v}
                        ></VersionGroupBadge>
                      ))}
                    </div>
                    <div className="text-md flex items-center gap-1 ">
                      <DotIcon className="size-4" />
                      {row.machine}
                    </div>
                  </div>
                </Fragment>
              ))}
            </>
          </Fragment>
        ))}
      </div>
    </PageLayoutSection>
  );
}
