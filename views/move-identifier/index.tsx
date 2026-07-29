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

  const [moveLearnPokes, moveLearnMethods, versionMoves] = await Promise.all([
    getMoveLearnPokesByVerionGroupId(move.id, 21),
    getMoveLearnMethod(),
    getVersionMoveHistory(move.id),
  ]);

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{move.nameKo}</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription className="text-foreground text-lg">
          {`${move.nameEn} / ${move.nameJa}`}
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <MoveInfoV2 move={move} />
      <VersionMoveInfo versionMoves={versionMoves} />
      <MoveLearnPokeList
        moveLearnMethods={moveLearnMethods}
        moveLearnPokes={moveLearnPokes}
      />
    </PageLayoutContainer>
  );
}
