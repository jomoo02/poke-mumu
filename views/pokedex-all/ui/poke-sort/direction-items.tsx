import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

// 정렬 방향 라디오 옵션(오름/내림 + 아이콘). poke-sort desktop·mobile 공용.
export const directionItems = [
  {
    id: 'dir-asc',
    value: 'asc',
    content: (
      <>
        오름차순
        <ArrowUpIcon className="size-4" />
      </>
    ),
  },
  {
    id: 'dir-desc',
    value: 'desc',
    content: (
      <>
        내림차순
        <ArrowDownIcon className="size-4" />
      </>
    ),
  },
];
