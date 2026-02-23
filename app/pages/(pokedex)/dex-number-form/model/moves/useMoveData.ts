'use client';

import useSWR from 'swr';

import { MachineType, MoveView, PokeMoves, RestMethod } from '.';

const fetcher = (versionGroupId: string) =>
  fetch(
    `/pages/dex-number-form/api/version-moves?versionGroupId=${versionGroupId}`,
  ).then((res) => res.json()) as Promise<Array<[number, MoveView]>>;

const REST_METHODS: RestMethod[] = [
  'evolution',
  'reminder',
  'egg',
  'tutor',
  'pre',
  'form',
] as const;

const MACHINE_TYPE: MachineType[] = ['TM', 'TR', 'HM'];

export function useMoveData(
  moves: PokeMoves | undefined,
  versionGroupId: number,
) {
  const { data, error, isLoading } = useSWR(`${versionGroupId}`, fetcher, {
    keepPreviousData: true,
  });

  const emptyResult = {
    error,
    isLoading,
    levelUpMoves: [],
    machineMoves: [],
    restMoves: [],
  };

  if (!data || !moves) {
    return emptyResult;
  }

  const versionMoves = new Map<number, MoveView>(
    data.map(([id, move]) => [Number(id), move]),
  );

  const levelUpMoves: MoveView[] = moves.level_up
    .map(({ move_id, level }) => {
      const move = versionMoves.get(move_id);
      return move ? { level, ...move } : null;
    })
    .filter((d) => !!d);

  const machineMoves =
    moves.machine?.map((id) => versionMoves.get(id)).filter((d) => !!d) || [];

  const machineMovesByMachineType = MACHINE_TYPE.map((machineType) => {
    const targetMachineTypeMoves = machineMoves.filter(
      (move) => move.machineType === machineType,
    );
    return {
      machineType,
      moves: targetMachineTypeMoves,
    };
  }).filter(({ moves }) => moves.length > 0);

  const restMoves = REST_METHODS.filter((method) => moves[method]?.length).map(
    (method) => ({
      method,
      moves: moves[method]!.map((id) => versionMoves.get(id)).filter(
        (d) => !!d,
      ),
    }),
  );

  return {
    error,
    isLoading,
    restMoves,
    levelUpMoves,
    machineMoves: machineMovesByMachineType,
  };
}
