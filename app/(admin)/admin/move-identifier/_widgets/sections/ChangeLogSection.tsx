'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  Badge,
  Button,
  ConfirmModal,
  Input,
  Select,
  cn,
  useToast,
} from '../../_shared/ui';
import {
  CHANGE_LOG_FIELDS,
  type ChangeLogField,
} from '../../_shared/pokemon/moveEnums';
import { VERSION_GROUPS } from '../../_shared/pokemon/versionGroup';
import type { ChangeLogRow } from '../../_entities/move/types';
import {
  deleteChangeLog,
  upsertChangeLog,
} from '../../_features/change-log/actions';

interface EditableRow extends ChangeLogRow {
  key: string;
  dirty: boolean;
}

const DEFAULT_VG = 21; // scarlet-violet

function newKey() {
  return `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function toEditable(row: ChangeLogRow): EditableRow {
  return { ...row, key: `db-${row.id}`, dirty: false };
}

export function ChangeLogSection({
  moveId,
  identifier,
  initial,
}: {
  moveId: number;
  identifier: string;
  initial: ChangeLogRow[];
}) {
  const toast = useToast();
  const [rows, setRows] = useState<EditableRow[]>(() => initial.map(toEditable));
  const [pending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<EditableRow | null>(null);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // (vg, field) 중복 경고용 카운트 (§8)
  const dupKeys = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) {
      const k = `${r.versionGroupId}|${r.field}`;
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    return counts;
  }, [rows]);

  function patch(key: string, patchFields: Partial<ChangeLogRow>) {
    setRows((prev) =>
      prev.map((r) =>
        r.key === key ? { ...r, ...patchFields, dirty: true } : r,
      ),
    );
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      {
        key: newKey(),
        moveId,
        versionGroupId: DEFAULT_VG,
        field: CHANGE_LOG_FIELDS[0],
        oldValue: null,
        newValue: null,
        dirty: true,
      },
    ]);
  }

  function save(row: EditableRow) {
    setSavingKey(row.key);
    startTransition(async () => {
      const result = await upsertChangeLog(
        {
          id: row.id,
          moveId: row.moveId,
          versionGroupId: row.versionGroupId,
          field: row.field,
          oldValue: row.oldValue,
          newValue: row.newValue,
        },
        identifier,
      );
      setSavingKey(null);
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '저장 실패');
        return;
      }
      setRows((prev) =>
        prev.map((r) =>
          r.key === row.key
            ? { ...r, id: result.data.id, key: `db-${result.data.id}`, dirty: false }
            : r,
        ),
      );
      toast('success', '변경이력 저장됨');
    });
  }

  function confirmDelete() {
    const target = deleteTarget;
    if (!target) return;
    if (target.id === undefined) {
      setRows((prev) => prev.filter((r) => r.key !== target.key));
      setDeleteTarget(null);
      return;
    }
    startTransition(async () => {
      const result = await deleteChangeLog(target.id!, identifier);
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '삭제 실패');
        setDeleteTarget(null);
        return;
      }
      setRows((prev) => prev.filter((r) => r.key !== target.key));
      setDeleteTarget(null);
      toast('success', '변경이력 삭제됨');
    });
  }

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">
            변경이력 (change_log)
          </h2>
          <Badge>{rows.length}행</Badge>
        </div>
        <Button variant="outline" onClick={addRow} disabled={pending}>
          + 행 추가
        </Button>
      </header>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">등록된 변경이력이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((row) => {
            const isDup = (dupKeys.get(`${row.versionGroupId}|${row.field}`) ?? 0) > 1;
            return (
              <div
                key={row.key}
                className={cn(
                  'rounded-lg border p-3',
                  row.dirty
                    ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/20'
                    : 'border-border',
                )}
              >
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[8rem_1fr_1fr_12rem]">
                  <label className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">field</span>
                    <Select
                      value={row.field}
                      onChange={(e) =>
                        patch(row.key, { field: e.target.value as ChangeLogField })
                      }
                    >
                      {CHANGE_LOG_FIELDS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </Select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">old_value</span>
                    <Input
                      value={row.oldValue ?? ''}
                      placeholder="∅"
                      onChange={(e) =>
                        patch(row.key, { oldValue: e.target.value || null })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">new_value</span>
                    <Input
                      value={row.newValue ?? ''}
                      placeholder="∅"
                      onChange={(e) =>
                        patch(row.key, { newValue: e.target.value || null })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">version_group</span>
                    <Select
                      value={row.versionGroupId}
                      onChange={(e) =>
                        patch(row.key, { versionGroupId: Number(e.target.value) })
                      }
                    >
                      {VERSION_GROUPS.map((vg) => (
                        <option key={vg.id} value={vg.id}>
                          {vg.identifier}
                        </option>
                      ))}
                    </Select>
                  </label>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {row.field} {row.oldValue ?? '∅'}→{row.newValue ?? '∅'} @
                      {VERSION_GROUPS.find((v) => v.id === row.versionGroupId)
                        ?.identifier ?? row.versionGroupId}
                    </span>
                    {isDup ? <Badge tone="warn">중복 (vg·field)</Badge> : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => save(row)}
                      disabled={pending || !row.dirty}
                    >
                      {savingKey === row.key ? '저장 중…' : '저장'}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => setDeleteTarget(row)}
                      disabled={pending}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        open={deleteTarget !== null}
        title="변경이력 삭제"
        message="이 변경이력 행을 삭제합니다. 되돌릴 수 없습니다."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        pending={pending}
      />
    </section>
  );
}
