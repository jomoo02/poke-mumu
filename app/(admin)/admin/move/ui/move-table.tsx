'use client';

import { useState } from 'react';

import type { AdminPokeMove, AdminLearnMethod } from '../types';
import {
  deletePokeMovesById,
  deletePokeMovesByVg,
  updatePokeMove,
} from '../actions';

type Props = {
  moves: AdminPokeMove[];
  learnMethods: AdminLearnMethod[];
  pokeNameKo: string;
  vgNameKo: string;
  pokeKey: string;
  vgId: number;
  onRefresh: () => void;
  onShowAddForm: () => void;
  onMsg: (msg: { type: 'success' | 'error'; text: string }) => void;
};

export default function MoveTable({
  moves,
  learnMethods,
  pokeNameKo,
  vgNameKo,
  pokeKey,
  vgId,
  onRefresh,
  onShowAddForm,
  onMsg,
}: Props) {
  // ── 체크박스 ──
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  // ── 인라인 수정 ──
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMethod, setEditMethod] = useState(1);
  const [editLevel, setEditLevel] = useState('');

  function toggleCheck(id: number) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (checkedIds.size === moves.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(moves.map((m) => m.id)));
    }
  }

  // ── 선택 삭제 ──
  async function handleDeleteSelected() {
    if (checkedIds.size === 0) return;
    if (!confirm(`${checkedIds.size}개 기술을 삭제할까요?`)) return;

    const result = await deletePokeMovesById([...checkedIds]);
    if (result.success) {
      onMsg({ type: 'success', text: `${result.count}개 삭제 완료` });
      setCheckedIds(new Set());
      onRefresh();
    } else {
      onMsg({ type: 'error', text: result.error ?? '삭제 실패' });
    }
  }

  // ── 버전 전체 삭제 ──
  async function handleDeleteAll() {
    if (
      !confirm(
        `${pokeNameKo}의 ${vgNameKo} 기술 데이터를 전부 삭제할까요?\n이 작업은 되돌릴 수 없습니다.`,
      )
    )
      return;

    const result = await deletePokeMovesByVg(pokeKey, vgId);
    if (result.success) {
      onMsg({ type: 'success', text: '전체 삭제 완료' });
      setCheckedIds(new Set());
      onRefresh();
    } else {
      onMsg({ type: 'error', text: result.error ?? '삭제 실패' });
    }
  }

  // ── 인라인 수정 ──
  function startEdit(m: AdminPokeMove) {
    setEditingId(m.id);
    setEditMethod(m.learnMethodId);
    setEditLevel(m.level != null ? String(m.level) : '');
  }

  async function handleSaveEdit() {
    if (editingId == null) return;

    const result = await updatePokeMove({
      id: editingId,
      learnMethodId: editMethod,
      level: editLevel ? Number(editLevel) : null,
    });

    if (result.success) {
      onMsg({ type: 'success', text: '수정 완료' });
      setEditingId(null);
      onRefresh();
    } else {
      onMsg({ type: 'error', text: result.error ?? '수정 실패' });
    }
  }

  return (
    <div className="space-y-3">
      {/* 헤더 + 액션바 */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">
          현재 기술 목록 ({moves.length}개)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteSelected}
            disabled={checkedIds.size === 0}
            className="rounded-md border border-border px-3 py-1.5 text-sm disabled:opacity-30 hover:bg-accent"
          >
            선택 삭제 ({checkedIds.size})
          </button>
          <button
            onClick={handleDeleteAll}
            disabled={moves.length === 0}
            className="rounded-md border border-red-500/30 px-3 py-1.5 text-sm text-red-400 disabled:opacity-30 hover:bg-red-500/10"
          >
            버전 전체 삭제
          </button>
          <button
            onClick={onShowAddForm}
            className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
          >
            기술 추가
          </button>
        </div>
      </div>

      {/* 테이블 */}
      {moves.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          이 버전에 등록된 기술이 없습니다
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="w-10 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={
                      checkedIds.size === moves.length && moves.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th className="px-3 py-2 text-left">기술</th>
                <th className="px-3 py-2 text-left">타입</th>
                <th className="px-3 py-2 text-left">분류</th>
                <th className="px-3 py-2 text-right">위력</th>
                <th className="px-3 py-2 text-right">PP</th>
                <th className="px-3 py-2 text-right">명중</th>
                <th className="px-3 py-2 text-left">학습</th>
                <th className="px-3 py-2 text-right">Lv</th>
                <th className="w-20 px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {moves.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-border last:border-none hover:bg-muted/20"
                >
                  <td className="px-3 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={checkedIds.has(m.id)}
                      onChange={() => toggleCheck(m.id)}
                    />
                  </td>
                  <td className="px-3 py-2 font-medium">
                    {m.moveNameKo}
                    <span className="ml-1 text-muted-foreground">
                      {m.moveIdentifier}
                    </span>
                  </td>
                  <td className="px-3 py-2">{m.typeNameKo ?? '-'}</td>
                  <td className="px-3 py-2">{m.damageClassNameKo ?? '-'}</td>
                  <td className="px-3 py-2 text-right">{m.power ?? '-'}</td>
                  <td className="px-3 py-2 text-right">{m.pp ?? '-'}</td>
                  <td className="px-3 py-2 text-right">{m.accuracy ?? '-'}</td>

                  {editingId === m.id ? (
                    <>
                      <td className="px-3 py-2">
                        <select
                          value={editMethod}
                          onChange={(e) => {
                            const id = Number(e.target.value);
                            setEditMethod(id);
                            if (id !== 1) setEditLevel('');
                          }}
                          className="rounded border border-border bg-card px-1 py-0.5 text-sm"
                        >
                          {learnMethods.map((lm) => (
                            <option key={lm.id} value={lm.id}>
                              {lm.nameKo}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <input
                          type="number"
                          value={editLevel}
                          disabled={editMethod !== 1}
                          onChange={(e) => setEditLevel(e.target.value)}
                          placeholder="-"
                          className="w-14 rounded border border-border bg-card px-1 py-0.5 text-right text-sm disabled:opacity-30"
                        />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={handleSaveEdit}
                          className="mr-1 text-sm text-green-400 hover:underline"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          취소
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-2">{m.learnMethodNameKo}</td>
                      <td className="px-3 py-2 text-right">{m.level ?? '-'}</td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => startEdit(m)}
                          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                        >
                          수정
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
