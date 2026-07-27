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
} from '@/shared/ui/page-layout';
import MoveInfo from './ui/move-info';
import MoveLearnPokeList from './ui/move-learn-poke-list';
import MoveInfoV2 from './ui/move-info-v2';
import MoveAppeared from './ui/move-appear';
import History from './ui/move-history';

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

      <div className="grid lg:grid-cols-2 gap-6">
        <History history={versionMoves} />
        <MoveAppeared versionMoves={versionMoves} move={move} />
      </div>
      <MoveLearnPokeList
        moveLearnMethods={moveLearnMethods}
        moveLearnPokes={moveLearnPokes}
      />
    </PageLayoutContainer>
  );
}
