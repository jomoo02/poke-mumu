import type { Type } from '@/_entities/type/@x/move';
import type { DamageClass } from '@/_entities/damage-class/@x/move';

interface Move {
  id: number;
  // 게임 공식 기술 번호. id(DB 키)와 달리 Z기술이 물리·특수 번호를 둘씩 차지해 622번 이후로 어긋난다
  moveNumber: number;
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  type: Type;
  // Z기술·다이맥스기술은 원래 기술의 분류를 따르므로 자기 분류가 없다
  damageClass: DamageClass | null;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  description: string;
}

const getMoveHref = (move: Pick<Move, 'identifier'>) =>
  `/move/${move.identifier}`;

const getMoveSubName = (move: Pick<Move, 'nameEn' | 'nameJa'>) =>
  `${move.nameEn} / ${move.nameJa}`;

export type { Move };

export { getMoveHref, getMoveSubName };
