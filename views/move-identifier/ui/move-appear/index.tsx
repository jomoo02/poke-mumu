import { Move, VersionMove } from '@/entities/move/model';
import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';
import { useMemo } from 'react';

interface MoveAppearedProps {
  move: Move;
  versionMoves: VersionMove[];
}
export type MachineGroup = {
  machine: string;
  versions: string[]; // 배열로 변경
};

export type GenerationMachineGroup = {
  generation: number;
  rows: MachineGroup[];
};
export default function MoveAppeared({
  move,
  versionMoves,
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
      const machineMap = new Map<string, string[]>();

      for (const e of genEntries) {
        const key = `${e.machineType}${String(e.machineNumber).padStart(2, '0')}`;
        const arr = machineMap.get(key) ?? [];
        arr.push(e.versionGroupNameKo);
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

  return (
    <PageLayoutSection>
      <div className="flex flex-col gap-3">
        <PageLayoutSectionTitle>등장</PageLayoutSectionTitle>
        <PageLayoutSectionDescription>
          첫 등장:{move.generation}세대
        </PageLayoutSectionDescription>
        <div>
          <h3 className="text-xl font-semibold mt-3">기술머신</h3>
          <div>
            {machineGroups.map((gen) =>
              gen.rows.map((row) => (
                <div
                  key={`${gen.generation}-${row.machine}`}
                  className="py-2 flex flex-col gap-y-1"
                >
                  <div className="text-pretty break-keep">
                    {row.versions.map((v, i) => (
                      <span key={v}>
                        {i > 0 && ', '}
                        <span>{v}</span>
                      </span>
                    ))}
                  </div>
                  <div className="py-1.25 px-2.5 text-sm bg-muted inline-flex rounded-4xl w-fit">
                    {row.machine}
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </PageLayoutSection>
  );
}
