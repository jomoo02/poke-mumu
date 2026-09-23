'use client';

import { useMemo, useRef, type RefObject } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';
import { useSingleParam } from '@/shared/lib/search-params';

import {
  ABILITY_SCOPES,
  ABILITY_SORTS,
  type AbilityScope,
  type AbilitySort,
} from './options';

export const PAGE_SIZE = 20;

const PAGE_KEY = 'page';
const SCOPE_KEY = 'scope';
const SORT_KEY = 'sort';

/** globals.css의 html scroll-padding-top과 같은 값. 목록 상단이 이보다 위면 앱 헤더에 가려진 것으로 본다. */
const SCROLL_PADDING_TOP = 72;

interface UseAbilityListV7Result {
  /** 강조에 쓸 현재 검색어 */
  search: string;
  /** 검색어로 거른 개수 (범위 필터 적용 전) */
  searchedCount: number;
  /** 범위 필터까지 적용한 개수 */
  visibleCount: number;
  /** 현재 페이지에 보여줄 목록 */
  pagedAbilities: Ability[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  scope: AbilityScope;
  setScope: (scope: AbilityScope) => void;
  resetScope: () => void;
  sort: AbilitySort;
  setSort: (sort: AbilitySort) => void;
  /** 페이지 이동 시 스크롤 기준이 되는 목록 최상단 요소 */
  listTopRef: RefObject<HTMLDivElement | null>;
}

/**
 * 검색(search) · 범위(scope) · 정렬(sort) · 페이지(page) 쿼리를 읽어 목록을 만든다.
 *
 * - 검색은 AbilitySearch(useSearchParamsInput)가 router.replace로 쓰고, 여기서는 읽기만 한다.
 * - 범위·정렬은 useSingleParam → router.replace. 기본값은 URL에서 지우고, `page`도 함께 지운다.
 * - 페이지 이동은 router.push라 뒤로가기로 이전 페이지가 복원된다.
 * - 검색어가 바뀌어 결과가 줄면 page가 범위를 넘길 수 있어 항상 clamp한다.
 */
export default function useAbilityListV7(
  abilities: Ability[],
): UseAbilityListV7Result {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';

  const {
    value: scope,
    setValue: setScope,
    reset: resetScope,
  } = useSingleParam<AbilityScope>(SCOPE_KEY, {
    defaultValue: 'all',
    validValues: ABILITY_SCOPES,
    resetKeys: [PAGE_KEY],
  });

  const { value: sort, setValue: setSort } = useSingleParam<AbilitySort>(
    SORT_KEY,
    {
      defaultValue: 'ko',
      validValues: ABILITY_SORTS,
      resetKeys: [PAGE_KEY],
    },
  );

  const searchedAbilities = useMemo(() => {
    const matchesKeyword = createSearchMatcher(search);

    return abilities.filter(({ nameKo, nameEn, nameJa }) =>
      matchesKeyword(nameKo, nameEn, nameJa),
    );
  }, [abilities, search]);

  const visibleAbilities = useMemo(() => {
    const scoped =
      scope === 'champions'
        ? searchedAbilities.filter(({ isChampions }) => Boolean(isChampions))
        : [...searchedAbilities];

    return sort === 'en'
      ? scoped.sort((a, b) => a.nameEn.localeCompare(b.nameEn, 'en'))
      : scoped.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
  }, [searchedAbilities, scope, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(visibleAbilities.length / PAGE_SIZE),
  );

  const parsedPage = Number.parseInt(searchParams.get(PAGE_KEY) ?? '', 10);
  const currentPage = Number.isNaN(parsedPage)
    ? 1
    : Math.min(Math.max(parsedPage, 1), totalPages);

  const pageStart = (currentPage - 1) * PAGE_SIZE;

  const pagedAbilities = useMemo(
    () => visibleAbilities.slice(pageStart, pageStart + PAGE_SIZE),
    [visibleAbilities, pageStart],
  );

  const listTopRef = useRef<HTMLDivElement>(null);

  // 페이지네이션은 목록 아래에 있어, 이동 후 새 페이지의 첫 항목이 화면 위로 벗어나 있다.
  // 목록 상단이 이미 보이면(짧은 페이지) 움직이지 않는다.
  const scrollToListTop = () => {
    const listTop = listTopRef.current;

    if (!listTop) return;
    if (listTop.getBoundingClientRect().top >= SCROLL_PADDING_TOP) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    listTop.scrollIntoView({
      block: 'start',
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // 1페이지는 파라미터를 남기지 않는다(첫 진입 URL과 문자열을 일치시킨다).
    if (page <= 1) {
      params.delete(PAGE_KEY);
    } else {
      params.set(PAGE_KEY, String(page));
    }

    const query = params.toString();

    // 기본 스크롤(페이지 최상단)은 검색창까지 올라가 과하다. 목록 상단으로만 직접 옮긴다.
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    scrollToListTop();
  };

  return {
    search,
    searchedCount: searchedAbilities.length,
    visibleCount: visibleAbilities.length,
    pagedAbilities,
    currentPage,
    totalPages,
    goToPage,
    scope,
    setScope,
    resetScope,
    sort,
    setSort,
    listTopRef,
  };
}
