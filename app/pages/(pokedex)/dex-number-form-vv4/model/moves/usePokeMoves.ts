'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { PokeMovesView, PokeMoves } from '.';

export function usePokeMoves(pokeMoves: PokeMovesView[]) {
  const gens = useMemo(() => pokeMoves.map((p) => p.generation), [pokeMoves]);

  const initialGen = gens.at(-1) ?? gens[0];

  const versionGroupMovesFor = useCallback(
    (gen: string | undefined) =>
      pokeMoves.find((p) => String(p.generation) === gen)?.versionGroupMoves ??
      [],
    [pokeMoves],
  );

  const defaultVgIdFor = (gen: string | undefined) =>
    String(versionGroupMovesFor(gen)[0]?.versionGroupId);

  const [selection, setSelection] = useState<{
    gen: number;
    versionGroupId: string | undefined;
  }>(() => {
    const gen = initialGen ?? 0;
    return { gen: Number(gen), versionGroupId: defaultVgIdFor(String(gen)) };
  });

  useEffect(() => {
    const genExists = gens.includes(selection.gen);
    const gen = genExists ? selection.gen : initialGen;
    const vgId = selection.versionGroupId ?? defaultVgIdFor(String(gen));

    if (gen !== selection.gen || vgId !== selection.versionGroupId) {
      Promise.resolve().then(() => {
        setSelection({ gen: gen!, versionGroupId: vgId });
      });
    }
  }, [pokeMoves, gens, initialGen]); // eslint-disable-line react-hooks/exhaustive-deps

  const versionGroupMoves = useMemo(
    () => versionGroupMovesFor(String(selection.gen)),
    [selection.gen, versionGroupMovesFor],
  );

  const versionGroups = useMemo(
    () =>
      versionGroupMoves.map(
        ({ versionGroup, versionGroupId, versionGroupKo }) => ({
          versionGroupKo,
          versionGroup,
          versionGroupId,
        }),
      ),
    [versionGroupMoves],
  );

  //
  const items = gens.reduce(
    (acc, cur) => {
      acc.push({ role: 'gen', value: String(cur), id: cur });
      const a =
        pokeMoves.find((p) => p.generation === cur)?.versionGroupMoves ?? [];
      const b = a.map((v) => {
        const id = v.versionGroupId;
        const value = v.versionGroupKo;
        return { id, value, role: 'version' };
      });
      acc.push(...b);
      return acc;
    },
    [] as { role: string; value: string; id: number }[],
  );

  const handleItemClick = (id: string) => {
    setSelectedVersionGroupId(id);
  };
  //

  const setSelectedGen = (gen: number) => {
    const vgId = defaultVgIdFor(String(gen));
    setSelection({ gen, versionGroupId: vgId });
  };

  const setSelectedVersionGroupId = (vgId: string) => {
    setSelection((prev) => ({ ...prev, versionGroupId: vgId }));
  };

  const selectedGen = selection.gen;

  const selectedVersionGroupId = selection.versionGroupId;

  const rrMoves = pokeMoves.flatMap((cur) =>
    cur.versionGroupMoves.map(
      (v) => [v.versionGroupId, v.moves] as unknown as [number, PokeMoves],
    ),
  );

  const movesMap = useMemo(
    () => new Map<number, PokeMoves>(rrMoves),
    [rrMoves],
  );

  const moves = useMemo(
    () => movesMap.get(Number(selectedVersionGroupId) || 0),
    [movesMap, selectedVersionGroupId],
  );

  const grouped = gens.map((gen) => {
    const moves =
      pokeMoves.find((p) => p.generation === gen)?.versionGroupMoves ?? [];

    return {
      gen: `${gen}세대`,
      values: moves.map((v) => ({
        id: String(v.versionGroupId),
        value: v.versionGroupKo,
      })),
    };
  });

  const versionGs = pokeMoves
    .map(({ versionGroupMoves }) => {
      const genIds = versionGroupMoves.map(
        ({ versionGroupId, versionGroupKo }) => ({
          versionGroupId,
          versionGroupKo,
        }),
      );
      return genIds;
    })
    .flat();

  const selectedVersionGroup = versionGs.find(
    ({ versionGroupId }) => String(versionGroupId) === selection.versionGroupId,
  )?.versionGroupKo;

  // console.log(versionGroups);
  return {
    // gens,
    // versionGroups,
    // setSelectedGen,
    selectedVersionGroupId,
    // selectedGen,
    setSelectedVersionGroupId,
    pokeMoves: moves,
    selectedVersionGroup,
    selectedGen,
    //
    grouped,
    // items,
    // handleItemClick,
    gens,
  };
}
