'use client';

import { useState, useEffect, useTransition } from 'react';

import type { AdminMoveResult, AdminLearnMethod, ParsedCsvRow } from '../types';
import { searchMoves, addPokeMoves, parseCsvMoves } from '../actions';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type Props = {
  pokeKey: string;
  vgId: number;
  learnMethods: AdminLearnMethod[];
  onClose: () => void;
  onAdded: () => void;
  onMsg: (msg: { type: 'success' | 'error'; text: string }) => void;
};

// ─────────────────────────────────────────────
// 배치 행 타입
// ─────────────────────────────────────────────

type PendingRow = {
  key: string;
  move: AdminMoveResult | null;
  learnMethodId: number;
  level: number | null;
};

let rowKeyCounter = 0;
function nextRowKey() {
  return `row-${++rowKeyCounter}`;
}

// ─────────────────────────────────────────────
// 컴포넌트
// ─────────────────────────────────────────────

export default function AddForm({
  pokeKey,
  vgId,
  learnMethods,
  onClose,
  onAdded,
  onMsg,
}: Props) {
  const [csvMode, setCsvMode] = useState(false);
  const [isPending, startTransition] = useTransition();

  // ── 행 추가 모드 state ──
  const [pendingRows, setPendingRows] = useState<PendingRow[]>([
    { key: nextRowKey(), move: null, learnMethodId: 1, level: null },
  ]);
  const [moveQuery, setMoveQuery] = useState('');
  const [moveResults, setMoveResults] = useState<AdminMoveResult[]>([]);
  const [showMoveDrop, setShowMoveDrop] = useState(false);
  const [activeRowKey, setActiveRowKey] = useState<string | null>(null);

  // ── CSV 모드 state ──
  const [csvText, setCsvText] = useState('');
  const [parsedRows, setParsedRows] = useState<ParsedCsvRow[]>([]);
  const [csvParsed, setCsvParsed] = useState(false);

  // ── 기술 검색 디바운스 ──
  useEffect(() => {
    if (!moveQuery || moveQuery.length < 1) {
      setMoveResults([]);
      setShowMoveDrop(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const results = await searchMoves(moveQuery, vgId);
        setMoveResults(results);
        setShowMoveDrop(true);
      } catch {
        setMoveResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [moveQuery, vgId]);

  // ── 행 관리 ──
  function addPendingRow() {
    setPendingRows((prev) => [
      ...prev,
      { key: nextRowKey(), move: null, learnMethodId: 1, level: null },
    ]);
  }

  function removePendingRow(key: string) {
    setPendingRows((prev) => prev.filter((r) => r.key !== key));
  }

  function updatePendingRow(key: string, patch: Partial<PendingRow>) {
    setPendingRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, ...patch } : r)),
    );
  }

  function handleSelectMove(move: AdminMoveResult) {
    if (activeRowKey) {
      updatePendingRow(activeRowKey, { move });
    }
    setMoveQuery('');
    setShowMoveDrop(false);
    setActiveRowKey(null);
  }

  // ── 행 모드 제출 ──
  async function handleSubmitRows() {
    const validRows = pendingRows.filter((r) => r.move !== null);
    if (validRows.length === 0) {
      onMsg({ type: 'error', text: '추가할 기술을 선택해주세요' });
      return;
    }

    const inputs = validRows.map((r) => ({
      pokeKey,
      versionGroupId: vgId,
      moveId: r.move!.id,
      learnMethodId: r.learnMethodId,
      level: r.level,
    }));

    const result = await addPokeMoves(inputs);
    if (result.success) {
      onMsg({ type: 'success', text: `${result.count}개 추가 완료` });
      onAdded();
      onClose();
    } else {
      onMsg({ type: 'error', text: result.error ?? '추가 실패' });
    }
  }

  // ── CSV 파싱 ──
  function handleParseCsv() {
    if (!csvText.trim()) return;
    startTransition(async () => {
      const results = await parseCsvMoves(csvText, vgId);
      setParsedRows(results);
      setCsvParsed(true);
    });
  }

  // ── CSV 제출 ──
  async function handleSubmitCsv() {
    const okRows = parsedRows.filter((r) => r.status === 'ok');
    if (okRows.length === 0) {
      onMsg({ type: 'error', text: '추가 가능한 행이 없습니다' });
      return;
    }

    const inputs = okRows.map((r) => ({
      pokeKey,
      versionGroupId: vgId,
      moveId: r.moveId!,
      learnMethodId: r.learnMethodId,
      level: r.level,
    }));

    const result = await addPokeMoves(inputs);
    if (result.success) {
      onMsg({ type: 'success', text: `${result.count}개 추가 완료` });
      onAdded();
      onClose();
    } else {
      onMsg({ type: 'error', text: result.error ?? '추가 실패' });
    }
  }

  // ── 렌더링 ──
  return (
    <div className="space-y-4 rounded-md border border-border p-4">
      {/* 헤더 + 모드 토글 */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">기술 추가</h2>
        <div className="flex items-center gap-3">
          <div className="flex rounded-md border border-border text-sm">
            <button
              onClick={() => setCsvMode(false)}
              className={`px-3 py-1 ${!csvMode ? 'bg-accent font-medium' : 'hover:bg-muted/30'}`}
            >
              행 추가
            </button>
            <button
              onClick={() => setCsvMode(true)}
              className={`px-3 py-1 ${csvMode ? 'bg-accent font-medium' : 'hover:bg-muted/30'}`}
            >
              CSV 붙여넣기
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            닫기
          </button>
        </div>
      </div>

      {csvMode ? (
        /* ────── CSV 모드 ────── */
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              포맷:{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                기술identifier또는이름,learn_method_id,level
              </code>
            </p>
            <p className="mb-2 text-sm text-muted-foreground">
              learn_method_id: 1=레벨업, 2=머신, 3=유전, 4=튜터 등 — 레벨업
              외에는 level 비워두기
            </p>
            <textarea
              value={csvText}
              onChange={(e) => {
                setCsvText(e.target.value);
                setCsvParsed(false);
              }}
              placeholder={`thunderbolt,2,\niron-tail,1,25\n10만볼트,2,`}
              rows={8}
              className="w-full rounded-md border border-border bg-card px-3 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <button
            onClick={handleParseCsv}
            disabled={!csvText.trim() || isPending}
            className="rounded-md border border-border px-4 py-1.5 text-sm disabled:opacity-30 hover:bg-accent"
          >
            {isPending ? '파싱 중...' : '파싱 + 검증'}
          </button>

          {/* 프리뷰 테이블 */}
          {csvParsed && parsedRows.length > 0 && (
            <CsvPreview rows={parsedRows} onSubmit={handleSubmitCsv} />
          )}

          {csvParsed && parsedRows.length === 0 && (
            <p className="text-sm text-muted-foreground">
              파싱할 행이 없습니다
            </p>
          )}
        </div>
      ) : (
        /* ────── 행 추가 모드 ────── */
        <div className="space-y-2">
          {pendingRows.map((row) => (
            <div
              key={row.key}
              className="flex items-center gap-2 rounded border border-border bg-muted/10 px-3 py-2"
            >
              {/* 기술 선택 */}
              <div className="relative flex-1">
                {row.move ? (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{row.move.nameKo}</span>
                    <span className="text-muted-foreground">
                      ({row.move.typeNameKo})
                    </span>
                    <button
                      onClick={() => updatePendingRow(row.key, { move: null })}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="기술 이름 검색"
                    className="w-full rounded border border-border bg-card px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring"
                    onFocus={() => setActiveRowKey(row.key)}
                    onChange={(e) => {
                      setActiveRowKey(row.key);
                      setMoveQuery(e.target.value);
                    }}
                  />
                )}

                {showMoveDrop &&
                  activeRowKey === row.key &&
                  moveResults.length > 0 && (
                    <div className="absolute top-full z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-border bg-card shadow-lg">
                      {moveResults.map((mr) => (
                        <button
                          key={mr.id}
                          className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-accent"
                          onClick={() => handleSelectMove(mr)}
                        >
                          <span>{mr.nameKo}</span>
                          <span className="text-muted-foreground">
                            {mr.typeNameKo}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              {/* 학습 방법 */}
              <select
                value={row.learnMethodId}
                onChange={(e) => {
                  const methodId = Number(e.target.value);
                  updatePendingRow(row.key, {
                    learnMethodId: methodId,
                    level: methodId === 1 ? row.level : null,
                  });
                }}
                className="rounded border border-border bg-card px-2 py-1 text-sm"
              >
                {learnMethods.map((lm) => (
                  <option key={lm.id} value={lm.id}>
                    {lm.nameKo}
                  </option>
                ))}
              </select>

              {/* 레벨 */}
              <input
                type="number"
                placeholder="Lv"
                value={row.level ?? ''}
                disabled={row.learnMethodId !== 1}
                onChange={(e) =>
                  updatePendingRow(row.key, {
                    level: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-16 rounded border border-border bg-card px-2 py-1 text-sm disabled:opacity-30"
              />

              {/* 행 삭제 */}
              <button
                onClick={() => removePendingRow(row.key)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          ))}

          <div className="flex gap-2">
            <button
              onClick={addPendingRow}
              className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
            >
              + 행 추가
            </button>
            <button
              onClick={handleSubmitRows}
              disabled={pendingRows.every((r) => r.move === null)}
              className="rounded-md bg-primary px-4 py-1.5 text-sm text-primary-foreground disabled:opacity-30 hover:bg-primary/90"
            >
              추가 ({pendingRows.filter((r) => r.move !== null).length}개)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// CSV 프리뷰 서브 컴포넌트
// ─────────────────────────────────────────────

function CsvPreview({
  rows,
  onSubmit,
}: {
  rows: ParsedCsvRow[];
  onSubmit: () => void;
}) {
  const okCount = rows.filter((r) => r.status === 'ok').length;
  const errorCount = rows.filter((r) => r.status !== 'ok').length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-green-400">✓ {okCount}개 추가 가능</span>
        {errorCount > 0 && (
          <span className="text-red-400">✕ {errorCount}개 오류</span>
        )}
      </div>

      <div className="max-h-64 overflow-y-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 border-b border-border bg-muted/30">
            <tr>
              <th className="w-10 px-3 py-1.5 text-right">#</th>
              <th className="px-3 py-1.5 text-left">상태</th>
              <th className="px-3 py-1.5 text-left">기술</th>
              <th className="px-3 py-1.5 text-left">타입</th>
              <th className="px-3 py-1.5 text-left">학습</th>
              <th className="px-3 py-1.5 text-right">Lv</th>
              <th className="px-3 py-1.5 text-left">비고</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.line}
                className={`border-b border-border last:border-none ${
                  r.status !== 'ok' ? 'bg-red-500/5' : ''
                }`}
              >
                <td className="px-3 py-1.5 text-right text-muted-foreground">
                  {r.line}
                </td>
                <td className="px-3 py-1.5">
                  {r.status === 'ok' ? (
                    <span className="text-green-400">OK</span>
                  ) : (
                    <span className="text-red-400">
                      {r.status === 'not-found' && '미발견'}
                      {r.status === 'not-in-version' && '버전없음'}
                      {r.status === 'invalid-level' && '레벨오류'}
                      {r.status === 'parse-error' && '파싱오류'}
                    </span>
                  )}
                </td>
                <td className="px-3 py-1.5">
                  {r.moveNameKo ?? r.moveIdentifier}
                  {r.moveNameKo && (
                    <span className="ml-1 text-muted-foreground">
                      {r.moveIdentifier}
                    </span>
                  )}
                </td>
                <td className="px-3 py-1.5">{r.typeNameKo ?? '-'}</td>
                <td className="px-3 py-1.5">{r.learnMethodId}</td>
                <td className="px-3 py-1.5 text-right">{r.level ?? '-'}</td>
                <td className="px-3 py-1.5 text-muted-foreground">
                  {r.error ?? ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={onSubmit}
        disabled={okCount === 0}
        className="rounded-md bg-primary px-4 py-1.5 text-sm text-primary-foreground disabled:opacity-30 hover:bg-primary/90"
      >
        추가 ({okCount}개)
      </button>
    </div>
  );
}
