import { getAllAbility } from './api';
import Container from './ui/container';

export default async function AbilityPageUI() {
  const abilities = await getAllAbility();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-16 min-h-svh flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">특성</h1>
        <div className="pt-4 text-muted-foreground">
          <p>3세대에 등장한 시스템, 5세대부터 숨겨진 특성(드림 특성) 추가</p>
          <p>총 {abilities.length}개의 특성</p>
        </div>
      </div>

      <Container abilities={abilities} />
    </div>
  );
}
