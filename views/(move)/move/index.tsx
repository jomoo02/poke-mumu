import { getAllDamageClass } from '@/entities/damage-class/api';
import { getAllRecentMoves } from '@/entities/move/api';
import { getAllType } from '@/entities/type/api';
import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/shared/ui/page-layout';
import MoveList from './ui/move-list';
import MoveSearch from './ui/move-search';
import MoveListV2 from './ui/move-list-v2';
import MoveListV3 from './ui/move-list-v3';
import MoveListV4 from './ui/move-list-v4';
import MoveListV5 from './ui/move-list-v5';

export default async function MoveView() {
  const [moves, allType, allDamageClass] = await Promise.all([
    getAllRecentMoves(),
    getAllType(),
    getAllDamageClass(),
  ]);

  const types = allType.filter((type) => type.identifier !== 'unknown');

  return (
    <PageLayoutContainer>
      <PageLayoutSection className="mt-0">
        <MoveSearch />
      </PageLayoutSection>
      <PageLayoutSection>
        <div>
          {/* <MoveListV3 moves={moves} /> */}
          <MoveListV5 moves={moves.slice(0, 100)} />
        </div>
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}
