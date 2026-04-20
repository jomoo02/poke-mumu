'use client';

import { useEffect, useMemo, useState } from 'react';
import { type PokeMovesView } from '.';

export default function usePokeMovesV2(pokeMoves: PokeMovesView[]) {
  const gens = useMemo(() => pokeMoves.map((p) => p.generation), [pokeMoves]);

  const [gen, setGen] = useState<number | undefined>(gens.at(-1) ?? gens[0]);

  const currentGenData = useMemo(
    () => pokeMoves.find((p) => p.generation === gen),
    [pokeMoves, gen],
  );

  const versionGroups = useMemo(
    () => currentGenData?.versionGroupMoves ?? [],
    [currentGenData],
  );

  const [selectedVersionGroup, setSelectedVersionGroup] = useState<
    number | undefined
  >();

  useEffect(() => {
    setSelectedVersionGroup(undefined);
  }, [gen]);

  const versionGroup =
    selectedVersionGroup &&
    versionGroups.some((v) => v.versionGroupId === selectedVersionGroup)
      ? selectedVersionGroup
      : versionGroups[0]?.versionGroupId;

  const versionGroupOptions = versionGroups.map((v) => ({
    id: v.versionGroupId,
    label: v.versionGroupKo,
  }));

  const moves = useMemo(
    () => versionGroups.find((v) => v.versionGroupId === versionGroup)?.moves,
    [versionGroups, versionGroup],
  );

  return {
    gen,
    gens,
    setGen,
    versionGroups: versionGroupOptions,
    versionGroup,
    setVersionGroup: (id: number) => setSelectedVersionGroup(id),
    moves,
  };
}
