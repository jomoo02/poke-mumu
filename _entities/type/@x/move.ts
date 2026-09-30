// move 엔티티 전용 공개 API: 기술 base 모델에 필요한 타입만
//
// @x를 쓰는 이유 (FSD에서 엔티티 간 import는 원칙적으로 금지)
// - 타입은 기술 base 모델의 일부(type)다
// - type은 타입 페이지·상성·필터 등 move 없이도 쓰이므로 move와 합치면 god slice가 된다
// 아이콘은 넘기지 않는다. 기술과 타입 아이콘의 조합은 페이지에서 한다
// 허용된 @x는 type → poke, type → move, damage-class → move 뿐이다
export type { Type } from '../model/type';
