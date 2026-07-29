import { VersionMove } from '@/entities/move/model';
import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';
import History from './move-history';
import MoveMachine from './move-machine';
import { buildMoveChangelog } from './move-changelog';
import { getMoveMachinGroups } from './move-machine.utils';

interface VersionMoveInfo {
  versionMoves: VersionMove[];
}

export default function VersionMoveInfo({ versionMoves }: VersionMoveInfo) {
  const history = buildMoveChangelog(versionMoves);
  const moveMachines = getMoveMachinGroups(versionMoves);
  if (history.changeRows.length === 0 && moveMachines.length === 0) {
    return null;
  }
  return (
    <PageLayoutSection>
      <div className="flex flex-col gap-3">
        <PageLayoutSectionTitle>버전별 기술 정보</PageLayoutSectionTitle>
        <PageLayoutSectionDescription>
          버전별 변화와 기술머신 수록 정보
        </PageLayoutSectionDescription>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        <History origin={history.origin} changeRows={history.changeRows} />
        <MoveMachine
          generationMachineGroups={moveMachines}
          className="lg:col-span-2 2xl:col-span-3"
        />
      </div>
    </PageLayoutSection>
  );
}
