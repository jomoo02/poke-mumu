'use client';

import useSWR from 'swr';

import {
  type MoveView,
  type PokeMoves,
  type MoveMethod,
  type RestMethod,
  type MoveViewNew,
} from '.';

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
];

const buildLabel = (
  method: MoveMethod,
  move: MoveView,
  level?: number,
): string => {
  switch (method) {
    case 'level_up':
      return `Lv.${level ?? '?'}`;
    case 'machine':
      return `${move.machineType ?? ''} ${String(move.machineNumber ?? '').padStart(3, '0')}`;
    case 'evolution':
      return '진화';
    case 'form':
      return '폼체인지';
    case 'egg':
      return '유전';
    case 'tutor':
      return 'NPC';
    case 'reminder':
      return '떠올리기';
    case 'pre':
      return '이전 진화';
  }
};

const toMoveViewNew = (
  move: MoveView,
  method: MoveMethod,
  level?: number,
): MoveViewNew => ({
  id: move.id,
  moveId: move.moveId,
  accuracy: move.accuracy,
  damageClass: move.damageClass,
  description: move.description,
  moveNumber: move.moveNumber,
  name: move.name,
  power: move.power,
  pp: move.pp,
  type: move.type,
  cooldown: move.cooldown,
  method,
  label: buildLabel(method, move, level),
  level,
  machineType: move.machineType,
  machineNumber: move.machineNumber,
});

export function useMoveDataNew(
  moves: PokeMoves | undefined,
  versionGroupId: number,
) {
  const { data, error, isLoading } = useSWR(`${versionGroupId}`, fetcher, {
    keepPreviousData: true,
  });

  if (!data || !moves) {
    return { error, isLoading, moves: [] as MoveViewNew[] };
  }

  const versionMoves = new Map<number, MoveView>(
    data.map(([id, move]) => [Number(id), move]),
  );

  const levelUpMoves: MoveViewNew[] = moves.level_up
    .map(({ move_id, level }) => {
      const move = versionMoves.get(move_id);
      return move ? toMoveViewNew(move, 'level_up', level) : null;
    })
    .filter((d): d is MoveViewNew => d !== null);

  const restMoves: MoveViewNew[] = REST_METHODS.flatMap((method) =>
    (moves[method] ?? [])
      .map((id) => {
        const move = versionMoves.get(id);
        return move ? toMoveViewNew(move, method) : null;
      })
      .filter((d): d is MoveViewNew => d !== null),
  );

  const machineMoves: MoveViewNew[] = (moves.machine ?? [])
    .map((id) => {
      const move = versionMoves.get(id);
      return move ? toMoveViewNew(move, 'machine') : null;
    })
    .filter((d): d is MoveViewNew => d !== null);

  return {
    error,
    isLoading,
    moves: [...levelUpMoves, ...restMoves, ...machineMoves],
  };
}
