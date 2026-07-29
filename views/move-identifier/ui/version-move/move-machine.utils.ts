import { VersionMove } from '@/entities/move/model';

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

export const getMoveMachinGroups = (versionMoves: VersionMove[]) => {
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
};
