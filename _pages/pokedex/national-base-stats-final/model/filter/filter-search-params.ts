import { parseAsArrayOf, parseAsString } from 'nuqs/server';

import { mapFilterGroups } from './filter-option';

const groupParser = parseAsArrayOf(parseAsString).withDefault([]);

// 필터: 그룹마다 키, 값은 ','로 (?type=fire,flying&form=alola&gen=1). 키 이름 = POKE_FILTER_GROUPS.
// 값 하나인 키라 바꿔도 제자리를 지켜, 키 순서는 그 그룹을 처음 고른 순서, 키 안은 고른 순서다
// (반복 키 parseAsNativeArrayOf는 바꿀 때마다 키가 URL 끝으로 옮겨진다)
const filterSearchParams = mapFilterGroups(() => groupParser);

// 필터 키 모두 지움. 검색어·이름 언어·정렬은 둔다 (결정 문서 2026-10-30 초기화 범위)
const FILTER_RESET_PATCH = mapFilterGroups(() => null);

export { filterSearchParams, FILTER_RESET_PATCH };
