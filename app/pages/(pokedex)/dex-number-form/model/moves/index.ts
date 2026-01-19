import { Json } from '@/types_db';
import { type Type } from '@/app/entities/type/model';
import { type Move } from '@/app/entities/move/model';

export type RestMethod =
  | 'egg'
  | 'tutor'
  | 'reminder'
  | 'pre'
  | 'evolution'
  | 'form';

export type MoveMethod = RestMethod | 'level_up' | 'machine';

export type PokeMoves = {
  level_up: { move_id: number; level: number }[];
  pre?: number[];
  machine?: number[];
  egg?: number[];
  tutor?: number[];
  reminder?: number[];
  evolution?: number[];
  form?: number[];
};

export interface PokeMovesView {
  generation: number;
  versionGroupMoves: {
    versionGroup: string;
    versionGroupKo: string;
    versionGroupId: number;
    moves: PokeMoves;
  }[];
}

export type MachineType = 'TM' | 'HM' | 'TR';

export interface MoveView {
  id: number;
  moveId: number;
  accuracy: number | null;
  damageClass: string;
  description: string;
  machineNumber: number | null;
  machineType: string | null;
  moveNumber: number;
  name: string;
  power: number | null;
  pp: number | null;
  type: Type;
  level?: number;
}

export const adaptMoveView = (move: Move, type: Type): MoveView => {
  const {
    id,
    move_id,
    move_number,
    accuracy,
    damage_class,
    description,
    machine_number,
    machine_type,
    name_ko,
    power,
    pp,
  } = move;

  return {
    id,
    accuracy,
    power,
    pp,
    type,
    description: description || 'description',
    machineNumber: machine_number,
    machineType: machine_type,
    name: name_ko,
    damageClass: damage_class,
    moveId: move_id,
    moveNumber: move_number,
  };
};

interface PokeMovesDto {
  id: number;
  version_group_id: number;
  versionGroup: {
    version_group_ko: string;
    id: number;
    generation: number;
    identifier: string;
    order: number;
  };
  moves: Json;
}

export const adaptPokeMovesView = (
  moves: PokeMovesDto[] | null,
): PokeMovesView[] => {
  if (!moves) {
    return [];
  }

  const gens = [...new Set(moves.map((m) => m.versionGroup.generation))].sort(
    (a, b) => a - b,
  );

  const genMoves = gens.map((g) => {
    const targetGenMoves = moves
      .filter((m) => m.versionGroup.generation === g)
      .sort((a, b) => a.versionGroup.order - b.versionGroup.order)
      .map((m) => ({
        versionGroupKo: m.versionGroup.version_group_ko,
        versionGroup: m.versionGroup.identifier,
        versionGroupId: m.version_group_id,
        moves: m.moves as PokeMoves,
      }));

    return { generation: g, versionGroupMoves: targetGenMoves };
  });

  return genMoves;
};

export { useMoveData } from './useMoveData';
export { usePokeMoves } from './usePokeMoves';
