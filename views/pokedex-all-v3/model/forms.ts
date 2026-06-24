// 모습(form) 필터 목록. v2의 분류(메가/알로라/가라르/히스이)를 그대로 가져온다.
// 한 포켓몬은 모습 카테고리를 하나만 가지므로 필터는 OR(합집합)이 타당.
export const FORM_FILTERS = [
  { identifier: 'mega', label: '메가진화' },
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
  { identifier: 'hisui', label: '히스이의 모습' },
] as const;

export type FormIdentifier = (typeof FORM_FILTERS)[number]['identifier'];
