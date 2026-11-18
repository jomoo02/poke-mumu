import type { Move } from '@/_entities/move';

// 기술 목록 한 줄에 필요한 값 (영문·일본어 이름은 보이지 않아 받지 않는다)
type ListMove = Omit<Move, 'nameEn' | 'nameJa'>;

export type { ListMove };
