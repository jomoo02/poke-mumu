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

interface MoveAppearedProps {
  versionMoves: VersionMove[];
  className?: string;
}

type MachineVersion = {
  identifier: string;
  nameKo: string;
};

export type MachineGroup = {
  machine: string;
  versions: MachineVersion[];
};

export type GenerationMachineGroup = {
  generation: number;
  rows: MachineGroup[];
};

export default function MoveMachine({
  versionMoves,
  className,
}: MoveAppearedProps) {
  const machineGroups = useMemo(() => {
    const entries = versionMoves.filter(
      (
        h,
      ): h is VersionMove & {
        machineType: string;
        machineNumber: number;
      } => h.machineType != null && h.machineNumber != null,
    );

    if (entries.length === 0) return [];

    // 세대별 그룹
    const genMap = new Map<number, typeof entries>();

    for (const e of entries) {
      const arr = genMap.get(e.generation) ?? [];
      arr.push(e);
      genMap.set(e.generation, arr);
    }

    const result: GenerationMachineGroup[] = [];

    for (const [generation, genEntries] of genMap) {
      // 같은 세대 내에서 머신 번호별 그룹
      const machineMap = new Map<string, MachineVersion[]>();

      for (const e of genEntries) {
        const key = `${e.machineType}${String(e.machineNumber).padStart(2, '0')}`;
        const arr = machineMap.get(key) ?? [];
        arr.push({
          identifier: e.versionGroupIdentifier,
          nameKo: e.versionGroupNameKo,
        });
        machineMap.set(key, arr);
      }

      const rows: MachineGroup[] = [];
      for (const [machine, versions] of machineMap) {
        rows.push({
          machine,
          versions: versions,
        });
      }

      result.push({ generation, rows });
    }

    result.sort((a, b) => a.generation - b.generation);

    return result;
  }, [versionMoves]);

  if (machineGroups.length === 0) {
    return null;
  }

  const description = '버전별 기술머신, 기술레코드 번호';

  return (
    <Card
      className={cn(
        'h-fit',
        className,
        machineGroups.length < 3 && 'lg:col-span-1 2xl:col-span-1',
      )}
    >
      <CardHeader>
        <CardTitle>기술머신</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'grid',
            machineGroups.length < 3 ? 'grid-cols-1' : 'lg:grid-cols-2',
          )}
        >
          {machineGroups.flatMap((gen) =>
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
