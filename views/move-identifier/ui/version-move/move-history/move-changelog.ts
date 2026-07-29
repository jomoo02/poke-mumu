import type { VersionMove } from '@/entities/move/model';

// ────────────────────────────────
// 타입
// ────────────────────────────────

/** 버전 간 비교 대상이 되는 필드 */
type DiffField =
  | 'nameKo'
  | 'power'
  | 'pp'
  | 'accuracy'
  | 'typeNameKo'
  | 'damageClassNameKo';

/** 한 필드의 변경(이전값 → 이후값) */
export type DiffChange = {
  label: string;
  from: string;
  to: string;
};

/** 한 버전 그룹에서 발생한 변경 묶음 */
export type VersionChangeRow = {
  versionGroupId: number;
  versionGroupIdentifier: string;
  versionGroupNameKo: string;
  generation: number;
  changes: DiffChange[];
};

// ────────────────────────────────
// 설정 · 순수 헬퍼
// ────────────────────────────────

/** 비교할 필드와 화면 라벨. 배열 순서 = 표시 순서 */
const DIFF_FIELDS: { field: DiffField; label: string }[] = [
  { field: 'nameKo', label: '이름' },
  { field: 'typeNameKo', label: '타입' },
  { field: 'damageClassNameKo', label: '분류' },
  { field: 'power', label: '위력' },
  { field: 'pp', label: 'PP' },
  { field: 'accuracy', label: '명중률' },
];

/** null/숫자를 표시용 문자열로 변환. 값 없음은 '-' */
function formatValue(value: string | number | null): string {
  return value == null ? '-' : String(value);
}

/** 버전 그룹 순(출시 순)으로 정렬한 새 배열을 반환 */
function sortByVersion(history: VersionMove[]): VersionMove[] {
  return [...history].sort((a, b) => a.versionGroupId - b.versionGroupId);
}

/** 두 버전을 비교해 바뀐 필드만 추출 */
function diffVersions(prev: VersionMove, curr: VersionMove): DiffChange[] {
  const changes: DiffChange[] = [];

  for (const { field, label } of DIFF_FIELDS) {
    if (prev[field] !== curr[field]) {
      changes.push({
        label,
        from: formatValue(prev[field]),
        to: formatValue(curr[field]),
      });
    }
  }

  return changes;
}

/** 정렬된 버전 목록 → 직전 버전 대비 변경이 있는 행만 모음 */
function buildChangeRows(sorted: VersionMove[]): VersionChangeRow[] {
  const rows: VersionChangeRow[] = [];

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    const changes = diffVersions(prev, curr);

    if (changes.length === 0) continue;

    rows.push({
      versionGroupId: curr.versionGroupId,
      versionGroupIdentifier: curr.versionGroupIdentifier,
      versionGroupNameKo: curr.versionGroupNameKo,
      generation: curr.generation,
      changes,
    });
  }

  return rows;
}

// ────────────────────────────────
// 진입점
// ────────────────────────────────

/**
 * 기술의 버전별 변천사를 계산한다. (순수 함수 — 훅 아님)
 * - `origin`: 가장 먼저 등장한 버전(초기값)
 * - `changeRows`: 직전 버전 대비 값이 바뀐 버전들의 변경 내역
 */
export function buildMoveChangelog(history: VersionMove[]) {
  const sorted = sortByVersion(history);

  return {
    origin: sorted[0] ?? null,
    changeRows: buildChangeRows(sorted),
  };
}
