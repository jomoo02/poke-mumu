import React from 'react';
import { GenMoves } from '@/app/models/pokev4.type';
import VersionMoveList from './version-move-list';
import useGenMoveList from '../hooks/useGenMoveList';
import ButtonGroup from './button-group';

interface GenMoveListProps {
  genMoves: GenMoves;
}

export default function GenMoveList({
  genMoves,
}: GenMoveListProps) {
  const {
    targetGenVersion,
    handleTargetVersion,
    genVersionMoveList,
    genVersionList,
  } = useGenMoveList(genMoves);

  return (
    <>
      <div className="px-1 sm:px-2 lg:px-7 border-b-2 sm:pt-3 border-slate-500">
        <ButtonGroup.Version
          versions={genVersionList}
          targetVersion={targetGenVersion}
          setTargetVersion={handleTargetVersion}
        />
      </div>
      <div className="px-1 xs:px-2 md:px-3 xl:px-7 pb-2">
        <VersionMoveList
          key={targetGenVersion}
          versionMoveList={genVersionMoveList}
        />
      </div>
    </>
  );
}
