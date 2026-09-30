// move 엔티티 전용 공개 API: 기술 base 모델에 필요한 타입만
//
// @x를 쓰는 이유 (FSD에서 엔티티 간 import는 원칙적으로 금지)
// - 분류는 기술 base 모델의 일부(damageClass)다
// - damage-class는 필터·아이콘처럼 move 없이도 쓰이므로 move와 합치지 않는다
// 아이콘은 넘기지 않는다. 기술과 분류 아이콘의 조합은 페이지에서 한다
export type { DamageClass } from '../model/damage-class';
