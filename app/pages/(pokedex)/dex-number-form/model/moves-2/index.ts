import { type Type } from '@/app/entities/type/model';

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

// API 응답 타입
export interface MoveView {
  id: number;
  moveId: number;
  accuracy: number | null;
  damageClass: string;
  description: string;
  machineNumber: number | null;
  machineType: string | null;
  moveNumber?: number;
  name: string;
  power: number | null;
  pp: number | null;
  type: Type;
  level?: number;
  cooldown?: number | null;
}

export interface MoveViewNew {
  id: number;
  moveId: number;
  accuracy: number | null;
  damageClass: string;
  description: string;
  moveNumber?: number;
  name: string;
  power: number | null;
  pp: number | null;
  type: Type;
  cooldown?: number | null;
  method: MoveMethod;
  label: string;
  // 정렬용
  level?: number;
  machineType?: string | null;
  machineNumber?: number | null;
}

export { useMoveDataNew } from './useMoveData';
