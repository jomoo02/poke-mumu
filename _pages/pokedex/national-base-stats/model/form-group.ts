// 모습 필터 선택지 (DB form_group). 라벨·순서를 데이터로 관리한다 (identifier가 URL 값: ?filter=form.alola)
// TODO: /pokedex/national을 _pages로 이관할 때 이 타입과 getFormGroups를 _entities/poke로 올린다 (2곳에서 쓰게 됨)
interface FormGroup {
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string;
}

export type { FormGroup };
