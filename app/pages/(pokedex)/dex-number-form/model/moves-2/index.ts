import { type Type } from '@/app/entities/type/model';
import { type MoveMethod } from '../moves';

export type { PokeMovesView, PokeMoves, MoveMethod, RestMethod } from '../moves';
export { useMoveDataNew } from './useMoveData';

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
