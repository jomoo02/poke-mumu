'use client';

import { useMemo, useState } from 'react';
import { PokeMovesView } from '.';

export default function usePokeMovesV2(pokeMoves: PokeMovesView[]) {
  // 1️⃣ 세대 목록
  const gens = useMemo(() => pokeMoves.map((p) => p.generation), [pokeMoves]);

  const [gen, setGen] = useState<number | undefined>(gens.at(-1) ?? gens[0]);

  // 2️⃣ 현재 세대 데이터
  const currentGenData = useMemo(
    () => pokeMoves.find((p) => p.generation === gen),
    [pokeMoves, gen],
  );

  const versionGroups = useMemo(
    () => currentGenData?.versionGroupMoves ?? [],
    [currentGenData],
  );

  // 3️⃣ 사용자가 선택한 versionGroup (raw state)
  const [selectedVersionGroup, setSelectedVersionGroup] = useState<
    number | undefined
  >();

  // 4️⃣ derived versionGroup (fallback 포함)
  const versionGroup =
    selectedVersionGroup &&
    versionGroups.some((v) => v.versionGroupId === selectedVersionGroup)
      ? selectedVersionGroup
      : versionGroups.at(-1)?.versionGroupId;

  //변경

  const versionGroupOptions = versionGroups.map((v) => ({
    id: v.versionGroupId,
    label: v.versionGroupKo,
  }));

  // 5️⃣ 최종 moves
  const moves = useMemo(
    () => versionGroups.find((v) => v.versionGroupId === versionGroup)?.moves,
    [versionGroups, versionGroup],
  );
  const selectedVersionGroupOption = versionGroupOptions.find(
    (v) => v.id === versionGroup,
  );

  return {
    gen,
    gens,
    setGen,
    versionGroups: versionGroupOptions,
    versionGroup,
    setVersionGroup: (id: number) => setSelectedVersionGroup(id),
    selectedVersionGroup: selectedVersionGroupOption,
    moves,
  };
}
