// 모습 필터 선택지 (DB form_group). 라벨·순서를 데이터로 관리한다 (identifier가 URL 값: ?filter=form.alola)
interface FormGroup {
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string;
}

export type { FormGroup };
