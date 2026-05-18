import { useMemo } from 'react';

import { type VersionMoveEntry } from '../model';

// ── 변화 항목 ──

type DiffField =
  | 'nameKo'
  | 'power'
  | 'pp'
  | 'accuracy'
  | 'typeNameKo'
  | 'damageClassNameKo';

const DIFF_CONFIG: { field: DiffField; label: string }[] = [
  { field: 'nameKo', label: '이름' },
  { field: 'typeNameKo', label: '타입' },
  { field: 'damageClassNameKo', label: '분류' },
  { field: 'power', label: '위력' },
  { field: 'pp', label: 'PP' },
  { field: 'accuracy', label: '명중' },
];

export type DiffChange = {
  label: string;
  from: string;
  to: string;
};

export type VersionChangeRow = {
  versionGroupId: number;
  versionGroupNameKo: string;
  generation: number;
  changes: DiffChange[];
};

export type MachineGroup = {
  machine: string;
  versions: string[]; // 배열로 변경
};

export type GenerationMachineGroup = {
  generation: number;
  rows: MachineGroup[];
};
function formatValue(value: string | number | null): string {
  if (value == null) return '-';
  return String(value);
}

export default function useVersionDiff(history: VersionMoveEntry[]) {
  // ── 변천사: 이전 버전 대비 변화만 추출 ──
  const changeRows = useMemo(() => {
    if (history.length === 0) return [];

    // sort_order 기반 정렬 (이미 vg_id asc로 오지만 안전하게)
    const sorted = [...history].sort(
      (a, b) => a.versionGroupId - b.versionGroupId,
    );

    const rows: VersionChangeRow[] = [];

    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      const changes: DiffChange[] = [];

      for (const { field, label } of DIFF_CONFIG) {
        const fromVal = prev[field];
        const toVal = curr[field];

        if (fromVal !== toVal) {
          changes.push({
            label,
            from: formatValue(fromVal),
            to: formatValue(toVal),
          });
        }
      }

      if (changes.length > 0) {
        rows.push({
          versionGroupId: curr.versionGroupId,
          versionGroupNameKo: curr.versionGroupNameKo,
          generation: curr.generation,
          changes,
        });
      }
    }

    return rows;
  }, [history]);

  // ── 첫 등장 정보 ──
  const origin = useMemo(() => {
    if (history.length === 0) return null;

    const sorted = [...history].sort(
      (a, b) => a.versionGroupId - b.versionGroupId,
    );

    return sorted[0];
  }, [history]);

  // ── 머신 정보 분리 ──
  const machines = useMemo(() => {
    return history
      .filter(
        (
          h,
        ): h is VersionMoveEntry & {
          machineType: string;
          machineNumber: number;
        } => h.machineType != null && h.machineNumber != null,
      )
      .map((h) => ({
        versionGroupId: h.versionGroupId,
        versionGroupNameKo: h.versionGroupNameKo,
        generation: h.generation,
        machineType: h.machineType,
        machineNumber: h.machineNumber,
      }));
  }, [history]);

  return { origin, changeRows, machines };
}
