import type { SortConfig } from '@/features/sort-control';

import type { NationalPoke } from './national-poke';

// key + dir 통일 모델. national은 도감번호·이름 2개 키 × 오름/내림.
export const pokeSortConfig: SortConfig<NationalPoke> = {
  options: [
    {
      key: 'dex_number',
      label: '도감번호',
      kind: 'sequence',
      accessor: (poke) => poke.dexNumber,
    },
    {
      key: 'name',
      label: '이름',
      kind: 'sequence',
      accessor: (poke) => poke.nameKo,
    },
  ],
  defaultKey: 'dex_number',
  defaultDir: 'asc',
  // 같은 도감번호(폼 여러 개)는 원본 순서(sort_order) 유지 → 0 반환(안정 정렬).
  tieBreak: (a, b) => a.dexNumber - b.dexNumber,
};
