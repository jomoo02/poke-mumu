import type {
  VersionMove,
  MachineMove,
  MachineType,
  MoveMethod,
  Move,
} from '@/app/models/detail.type';

function checkEmptyVersionMove(versionMove: VersionMove) {
  const filterdVersionMove = Object.values(versionMove).filter((moveList) => moveList.length > 0);

  return filterdVersionMove.length === 0;
}

function groupMachineType(machineMoveList: MachineMove[]) {
  const machineTypeList: MachineType[] = ['tm', 'tr', 'hm'];

  const filterMoveByMachineType = (type: MachineType) => (
    machineMoveList
      .filter(({ machine }) => machine.type === type)
      .sort((a, b) => a.machine.number - b.machine.number)
  );

  return machineTypeList
    .map((type) => ({ type, moveList: filterMoveByMachineType(type) }))
    .filter(({ moveList }) => moveList.length > 0);
}

function categorizeVersionMove(versionMove: VersionMove) {
  const setVersionMoveItem = (method: MoveMethod, moveList: Move[]) => ({
    method,
    moveList,
  });

  return Object
    .entries(versionMove)
    .map(([method, moveList]) => setVersionMoveItem(method as MoveMethod, moveList));
}

export {
  categorizeVersionMove,
  checkEmptyVersionMove,
  groupMachineType,
};
