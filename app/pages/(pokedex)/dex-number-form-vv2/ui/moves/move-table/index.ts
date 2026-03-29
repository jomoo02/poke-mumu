import { type MoveMethod } from '../../../model';

import {
  basicColumns,
  machineColumn,
  legendsZaBasicColumns,
  levelUpColumn,
} from './table-columns';

const LEGENDS_ZA_ID = 22;

export const getTableColumns = (method: MoveMethod, versionGroupId: number) => {
  if (versionGroupId === LEGENDS_ZA_ID) {
    if (method === 'level_up') {
      return [{ ...levelUpColumn }, ...legendsZaBasicColumns];
    }
    if (method === 'machine') {
      return [{ ...machineColumn }, ...legendsZaBasicColumns];
    }
    return [...legendsZaBasicColumns];
  }

  if (method === 'level_up') {
    return [{ ...levelUpColumn }, ...basicColumns];
  }
  if (method === 'machine') {
    return [{ ...machineColumn }, ...basicColumns];
  }
  return [...basicColumns];
};
