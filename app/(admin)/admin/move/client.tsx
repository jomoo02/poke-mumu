'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';

import type {
  AdminPokeResult,
  AdminVersionGroup,
  AdminLearnMethod,
  AdminPokeMove,
} from './types';
import { getPokeMovesForVg } from './actions';
import PokeSelector from './ui/poke-selector';
import MoveTable from './ui/move-table';
import AddForm from './ui/add-form';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type Props = {
  versionGroups: AdminVersionGroup[];
  learnMethods: AdminLearnMethod[];
};

// ─────────────────────────────────────────────
// 메인 오케스트레이터
// ─────────────────────────────────────────────

export default function AdminMoveClient({
  versionGroups,
  learnMethods,
}: Props) {
  // ── 컨텍스트 선택 ──
  const [selectedPoke, setSelectedPoke] = useState<AdminPokeResult | null>(
    null,
  );
  const [selectedVg, setSelectedVg] = useState<number | null>(null);

  // ── 기술 목록 ──
  const [moves, setMoves] = useState<AdminPokeMove[]>([]);
  const [isPending, startTransition] = useTransition();

  // ── 추가 폼 표시 ──
  const [showAddForm, setShowAddForm] = useState(false);

  // ── 알림 ──
  const [msg, setMsg] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // ── 기술 목록 로드 ──
  const loadMoves = useCallback(() => {
    if (!selectedPoke || !selectedVg) {
      setMoves([]);
      return;
    }
    startTransition(async () => {
      try {
        const result = await getPokeMovesForVg(
          selectedPoke.pokeKey,
          selectedVg,
        );
        setMoves(result);
      } catch (e) {
        setMsg({
          type: 'error',
          text: e instanceof Error ? e.message : '조회 실패',
        });
      }
    });
  }, [selectedPoke, selectedVg]);

  useEffect(() => {
    loadMoves();
  }, [loadMoves]);

  // ── 파생값 ──
  const vgNameKo = versionGroups.find((v) => v.id === selectedVg)?.nameKo ?? '';

  return (
    <div className="space-y-6 min-h-svh">
      {msg && (
        <div
          className={`rounded-md px-4 py-2 text-sm ${
            msg.type === 'success'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {msg.text}
          <button
            className="ml-3 text-muted-foreground"
            onClick={() => setMsg(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── 컨텍스트 선택 ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-sm text-muted-foreground">
            포켓몬
          </label>
          <PokeSelector
            selected={selectedPoke}
            onSelect={setSelectedPoke}
            onClear={() => {
              setSelectedPoke(null);
              setMoves([]);
              setShowAddForm(false);
            }}
          />
        </div>

        <div className="w-64">
          <label className="mb-1 block text-sm text-muted-foreground">
            버전
          </label>
          <select
            value={selectedVg ?? ''}
            onChange={(e) =>
              setSelectedVg(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">버전 선택</option>
            {versionGroups.map((vg) => (
              <option key={vg.id} value={vg.id}>
                [{vg.generation}세대] {vg.nameKo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── 로딩 ── */}
      {isPending && <p className="text-sm text-muted-foreground">로딩 중...</p>}

      {/* ── 기술 목록 테이블 ── */}
      {selectedPoke && selectedVg && !isPending && (
        <MoveTable
          moves={moves}
          learnMethods={learnMethods}
          pokeNameKo={selectedPoke.nameKo}
          vgNameKo={vgNameKo}
          pokeKey={selectedPoke.pokeKey}
          vgId={selectedVg}
          onRefresh={loadMoves}
          onShowAddForm={() => setShowAddForm(true)}
          onMsg={setMsg}
        />
      )}

      {/* ── 기술 추가 폼 ── */}
      {showAddForm && selectedPoke && selectedVg && (
        <AddForm
          pokeKey={selectedPoke.pokeKey}
          vgId={selectedVg}
          learnMethods={learnMethods}
          onClose={() => setShowAddForm(false)}
          onAdded={loadMoves}
          onMsg={setMsg}
        />
      )}
    </div>
  );
}
