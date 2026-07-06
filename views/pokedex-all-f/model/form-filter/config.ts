const FORM_FILTERS = [
  { identifier: 'mega', label: '메가진화' },
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
  { identifier: 'hisui', label: '히스이의 모습' },
] as const;

type FormIdentifier = (typeof FORM_FILTERS)[number]['identifier'];

export { FORM_FILTERS, type FormIdentifier };
