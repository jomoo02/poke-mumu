import {
  basicColumns,
  machineColumn,
  // legendsZaBasicColumns,
  levelUpColumn,
} from './table-columns';
import { legendsZaBasicColumns } from './table-coulmns-za';
import { type MoveMethod } from '../../../model';

const LEGENDS_ZA_ID = 22;

const getTableColumns = (method: MoveMethod, versionGroupId: number) => {
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

const getSorting = (method: MoveMethod) => {
  if (method === 'level_up') {
    return 'level';
  }
  if (method === 'machine') {
    return 'machine';
  }
  return 'name';
};

const titleMap: Record<string, string> = {
  level_up: '레벨 업으로 익히는 기술',
  evolution: '진화 시 배우는 기술',
  form: '폼체인지로 배우는 기술',
  egg: '유전으로 배우는 기술',
  tutor: 'NPC로부터 배울 수 있는 기술',
  reminder: '떠올리기로 배우는 기술',
  pre: '이전 진화에서 얻을 수 있는 기술',
  TM: '기술머신 TM으로 배우는 기술',
  HM: '기술머신 HM으로 배우는 기술',
  TR: '기술머신 TR로 배우는 기술',
};

const getTitle = (method: MoveMethod, machineType: string = '') => {
  if (method === 'machine') {
    return titleMap[machineType];
  }
  return titleMap[method];
};
export { getSorting, getTableColumns, getTitle };
