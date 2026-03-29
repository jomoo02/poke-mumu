import { Type } from '@/app/entities/type/model';
import {
  adaptMoveView,
  adaptZaMoveView,
  type MoveView,
  type LegendsZaMove,
} from '../../model';
import { Move } from '@/app/entities/move/model';

const LEGENDS_ZA_ID = 22;

type MoveAdapter<T> = (move: T, type: Type) => MoveView;

export const resolveVersionSource = <T extends Move | LegendsZaMove>(
  versionGroupId: number,
): {
  table: 'version_move_legends_za' | 'version_move';
  adapter: MoveAdapter<T>;
} => {
  if (versionGroupId === LEGENDS_ZA_ID) {
    return {
      table: 'version_move_legends_za',
      adapter: adaptZaMoveView as MoveAdapter<T>,
    };
  }

  return {
    table: 'version_move',
    adapter: adaptMoveView as MoveAdapter<T>,
  };
};
