'use client';

import useSearchParamsState from './useSearchParamsState';

export const FORM_FILTERS = [
  { identifier: 'mega', label: '메가진화' },
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
  { identifier: 'hisui', label: '히스이의 모습' },
] as const;

export type FormIdentifier = (typeof FORM_FILTERS)[number]['identifier'];

// 모습 필터 로직(선택 상태·토글·리셋). desktop/mobile UI가 공유한다.
export default function useFormFilter() {
  const { searchParams, toggle, update } = useSearchParamsState();

  const selected = searchParams.getAll('form').filter(Boolean);

  return {
    selected,
    options: FORM_FILTERS,
    toggle: (id: string) => toggle('form', id),
    reset: () => update({ form: null }),
  };
}
