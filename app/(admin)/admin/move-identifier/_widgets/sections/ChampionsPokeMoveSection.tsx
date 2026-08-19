'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import Image from 'next/image';
import {
  Badge,
  Button,
  ConfirmModal,
  Input,
  cn,
  useToast,
} from '../../_shared/ui';
import type {
  ChampionsPokeMoveRow,
  PokeSearchResult,
} from '../../_entities/move/types';
import {
  addChampionsPokeMoves,
  removeChampionsPokeMove,
  searchPoke,
} from '../../_features/champions-poke-move/actions';

function Sprite({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return <div className="h-10 w-10 shrink-0 rounded bg-muted" aria-hidden />;
  }
  const imageSrc = `https://raw.githubusercontent.com/jomoo02/poke_sprites/refs/heads/main/home/${src}.png`;
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={40}
      height={40}
      unoptimized
      className="h-10 w-10 shrink-0 object-contain"
    />
  );
}

export function ChampionsPokeMoveSection({
  moveId,
  identifier,
  list,
}: {
  moveId: number;
  identifier: string;
  list: ChampionsPokeMoveRow[];
}) {
  const toast = useToast();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PokeSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<PokeSearchResult[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<ChampionsPokeMoveRow | null>(
    null,
  );

  const addedKeys = useMemo(() => new Set(list.map((r) => r.pokeKey)), [list]);
  const selectedKeys = useMemo(
    () => new Set(selected.map((r) => r.pokeKey)),
    [selected],
  );

  function runSearch(q: string) {
    setQuery(q);
    if (q.trim() === '') {
      setResults([]);
      return;
    }
    setSearching(true);
    startTransition(async () => {
      const found = await searchPoke(q);
      setResults(found);
      setSearching(false);
    });
  }

  function toggleSelect(poke: PokeSearchResult) {
    setSelected((prev) =>
      prev.some((p) => p.pokeKey === poke.pokeKey)
        ? prev.filter((p) => p.pokeKey !== poke.pokeKey)
        : [...prev, poke],
    );
  }

  function add() {
    if (selected.length === 0) return;
    const keys = selected.map((p) => p.pokeKey);
    startTransition(async () => {
      const result = await addChampionsPokeMoves(moveId, keys, identifier);
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '추가 실패');
        return;
      }
      const { inserted, skipped } = result.data;
      setSelected([]);
      setResults([]);
      setQuery('');
      router.refresh();
      toast(
        'success',
        `${inserted}마리 추가${skipped ? `, ${skipped}마리 중복 스킵` : ''}`,
      );
    });
  }

  function confirmDelete() {
    const target = deleteTarget;
    if (!target) return;
    startTransition(async () => {
      const result = await removeChampionsPokeMove(target.id, identifier);
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '삭제 실패');
        setDeleteTarget(null);
        return;
      }
      setDeleteTarget(null);
      router.refresh();
      toast('success', '관계 삭제됨');
    });
  }

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">
          Champions 학습 포켓몬 (champions_poke_move)
        </h2>
        <Badge>{list.length}마리</Badge>
      </header>

      {/* 현재 목록 */}
      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          이 기술을 Champions에서 배우는 포켓몬이 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {list.map((row) => (
            <li key={row.id} className="flex items-center gap-3 p-2">
              <Sprite src={row.sprite} alt={row.nameKo} />
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {row.nameKo}
                </span>
                <span className="text-sm text-muted-foreground">
                  #{row.dexNumber} · {row.pokeKey}
                </span>
              </div>
              <Button
                variant="ghost"
                className="ml-auto text-destructive"
                onClick={() => setDeleteTarget(row)}
                disabled={pending}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* 검색 · 다중 추가 */}
      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4">
        <Input
          value={query}
          placeholder="포켓몬 이름(한/영) 또는 poke_key 검색"
          onChange={(e) => runSearch(e.target.value)}
        />

        {searching ? (
          <p className="text-sm text-muted-foreground">검색 중…</p>
        ) : results.length > 0 ? (
          <ul className="flex max-h-72 flex-col divide-y divide-border overflow-y-auto rounded-lg border border-border">
            {results.map((poke) => {
              const already = addedKeys.has(poke.pokeKey);
              const checked = selectedKeys.has(poke.pokeKey);
              return (
                <li
                  key={poke.pokeKey}
                  className={cn(
                    'flex items-center gap-3 p-2',
                    already && 'opacity-50',
                  )}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={checked}
                    disabled={already}
                    onChange={() => toggleSelect(poke)}
                  />
                  <Sprite src={poke.sprite} alt={poke.nameKo} />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                      {poke.nameKo}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      #{poke.dexNumber} · {poke.pokeKey}
                    </span>
                  </div>
                  {already ? (
                    <Badge className="ml-auto" tone="success">
                      추가됨
                    </Badge>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : query.trim() !== '' ? (
          <p className="text-sm text-muted-foreground">검색 결과가 없습니다.</p>
        ) : null}

        {/* 선택 칩 */}
        {selected.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {selected.map((poke) => (
              <button
                key={poke.pokeKey}
                type="button"
                onClick={() => toggleSelect(poke)}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-sm text-foreground hover:bg-muted/70"
              >
                {poke.nameKo}
                <span className="text-muted-foreground">✕</span>
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {selected.length}마리 선택됨
          </span>
          <Button onClick={add} disabled={pending || selected.length === 0}>
            {pending ? '추가 중…' : '추가'}
          </Button>
        </div>
      </div>

      <ConfirmModal
        open={deleteTarget !== null}
        title="학습 관계 삭제"
        message={
          deleteTarget
            ? `${deleteTarget.nameKo}(#${deleteTarget.dexNumber}) 의 학습 관계를 삭제합니다.`
            : ''
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        pending={pending}
      />
    </section>
  );
}
