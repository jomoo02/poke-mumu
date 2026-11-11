import type { Ability } from '@/_entities/ability';

// 특성 목록 한 줄에 필요한 값 (영문·일본어 이름은 보이지 않아 받지 않는다)
interface ListAbility extends Ability {
  // 게임 공식 특성 번호 (Bulbapedia #). 빈 번호가 있다
  abilityNumber: number;
  gen: number;
  isChampions: boolean;
}

export type { ListAbility };
