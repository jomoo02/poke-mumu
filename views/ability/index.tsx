import { getAllAbility } from '@/entities/ability/api';

import MainContainer from './ui/main-container';

export default async function AbilityPageView() {
  const abilities = await getAllAbility();

  return (
    <div className="max-w-7xl 2xl:max-w-350 mx-auto px-4 sm:px-6 py-12 w-full min-h-svh flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">특성</h1>
        <div className="pt-3 text-muted-foreground">
          <p className="break-keep text-balance">
            3세대에 등장한 시스템, 5세대부터 숨겨진 특성(드림 특성) 추가, 총{' '}
            {abilities.length}개의 특성
          </p>
        </div>
      </div>

      <MainContainer abilities={abilities} />
    </div>
  );
}
