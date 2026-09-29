// poke 엔티티 전용 공개 API: 포켓몬 base 모델과 카드 렌더링에 필요한 것만
//
// @x를 쓰는 이유 (FSD에서 엔티티 간 import는 원칙적으로 금지)
// - 타입은 포켓몬 base 모델의 일부(type1/type2)이고, 카드가 아이콘과 타입 색을 항상 쓴다
// - type은 타입 페이지·상성·필터 등 poke 없이도 쓰이므로 poke와 합치면 god slice가 된다
// - slot으로 페이지에서 조합하면 카드를 쓰는 모든 페이지가 아이콘·색을 매번 넘겨야 한다
// 허용된 @x는 type → poke, type → move, damage-class → move 뿐이다
export type { Type } from '../model/type';
export { getTypeColor } from '../model/type-color';
export { TypeIcon } from '../ui/type-icon';
