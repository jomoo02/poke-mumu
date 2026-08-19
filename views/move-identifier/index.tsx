import {
  getMoveLearnMethod,
  getRecentMoveByIdentifier,
  getVersionMoveHistory,
} from '@/entities/move/api';
import { getMoveLearnPokesByVerionGroupId } from '@/features/poke-move/api';
import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

import MoveLearnPokeList from './ui/move-learn-poke-list';
import MoveInfoV2 from './ui/move-info-v2';

import History from './ui/move-history';
import MoveMachine from './ui/move-machine';
import VersionMoveInfo from './ui/version-move';
import { getLegendsArceusMove } from './api';
import LaMove from './ui/la-move';
import MainSection from './ui/main-section';
import MoveLearnPokeListV2 from './ui/move-learn-poke-list-v2';
import { getMoveChangeLog } from './api/change-log';
import MoveChageLog from './ui/move-changelog';
import MoveChageLogV2 from './ui/move-changelog-v2';
import MoveMachineV2 from './ui/move-machine-v2';
import { getChampionsPokes } from './api/poke';
import PokeList from './ui/poke-list';

interface MoveIdentifierViewProps {
  identifier: string;
}

export default async function MoveIdentifierView({
  identifier,
}: MoveIdentifierViewProps) {
  const move = await getRecentMoveByIdentifier(identifier);

  if (!move) {
    return <div>123</div>;
  }

  const [
    moveLearnPokes,
    moveLearnMethods,
    versionMoves,
    laMove,
    changeLog,
    pokes,
  ] = await Promise.all([
    getMoveLearnPokesByVerionGroupId(move.id, 21),
    getMoveLearnMethod(),
    getVersionMoveHistory(move.id),
    getLegendsArceusMove(move.id),
    getMoveChangeLog(move.id),
    getChampionsPokes(move.id),
  ]);

  return (
    <div className="flex ">
      <PageLayoutContainer className="max-w-6xl px-[4.375vw] mx-auto">
        <MainSection move={move} />
        {/* <PageLayoutHeader>
        <PageLayoutHeaderTitle>{move.nameKo}</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription className="text-foreground text-lg">
          {`${move.nameEn} / ${move.nameJa}`}
        </PageLayoutHeaderDescription>
      </PageLayoutHeader> */}
        {/* <MoveInfoV2 move={move} /> */}

        {/* <MoveChageLog changeLog={changeLog} /> */}
        <div className="grid grid-cols-2 gap-6">
          <MoveChageLogV2 changeLog={changeLog} />
          <MoveMachineV2 versionMoves={versionMoves} />
        </div>

        <VersionMoveInfo versionMoves={versionMoves} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          <LaMove move={laMove} />
        </div>
        <PokeList pokes={pokes} />

        {/* <MoveLearnPokeListV2
        moveLearnMethods={moveLearnMethods}
        moveLearnPokes={moveLearnPokes}
      /> */}
      </PageLayoutContainer>
      {/* <div className="w-[15rem]" /> */}
    </div>
  );
}
