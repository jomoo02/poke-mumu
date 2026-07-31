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
import type { GenerationMachineGroup } from '../move-machine.utils';

interface MoveMachinProps {
  generationMachineGroups: GenerationMachineGroup[];
  className?: string;
}

export default function MoveMachine({
  generationMachineGroups,
  className,
}: MoveMachinProps) {
  if (generationMachineGroups.length === 0) {
    return null;
  }

  const description = '버전별 기술머신, 기술레코드 번호';

  return (
    <Card
      className={cn(
        'h-fit',
        className,
        generationMachineGroups.length < 3 && 'lg:col-span-1 2xl:col-span-1',
      )}
    >
      <CardHeader>
        <CardTitle>기술머신</CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'grid',
            generationMachineGroups.length < 3
              ? 'grid-cols-1'
              : 'lg:grid-cols-1',
          )}
        >
          {generationMachineGroups.flatMap((gen) =>
            gen.rows.map((row) => (
              <div
                key={`${gen.generation}-${row.machine}`}
                className="py-2 flex flex-col gap-y-2"
              >
                <div className="flex flex-wrap gap-1.5">
                  {row.versions.map((v) => (
                    <VersionGroupBadge key={v.identifier} versionGroup={v} />
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
      </CardContent>
    </Card>
  );
}
