'use client';

import { useMemo } from 'react';
import { VersionMoveEntry } from '../model';
import { GenerationMachineGroup, MachineGroup } from '../model/useMoveDiff';

interface MachineListProps {
  history: VersionMoveEntry[];
}

export default function MachineList({ history }: MachineListProps) {
  const machineGroups = useMemo(() => {
    const entries = history.filter(
      (
        h,
      ): h is VersionMoveEntry & {
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
  }, [history]);

  if (machineGroups.length === 0) {
    return null;
  }

  // const sliceIndex =
  //   machines.length > 10 ? Math.floor(machines.length / 2) : 10;
  // const machines1 = machines.slice(0, sliceIndex);
  // const machines2 = machines.slice(sliceIndex);

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-wide mt-10">기술머신</h2>
      <div className="pt-4">
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
      {/* <div className="grid md:grid-cols-2 gap-x-6 pt-4">
        <div className="">
          {machines1.map((m) => (
            <div key={m.versionGroupId} className="flex gap-1 py-2">
              <div className="text-pretty break-keep">
                {m.versionGroupNameKo}
              </div>
              -
              <div>
                {m.machineType}
                {String(m.machineNumber).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
        {machines2.length > 0 && (
          <div className="">
            {machines2.map((m) => (
              <div key={m.versionGroupId} className="flex gap-1 py-2">
                <div className="text-pretty break-keep">
                  {m.versionGroupNameKo}
                </div>
                -
                <div>
                  {m.machineType}
                  {String(m.machineNumber).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </section>
  );
}
