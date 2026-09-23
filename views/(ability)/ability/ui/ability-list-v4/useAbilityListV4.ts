'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

export const PAGE_SIZE = 24;

const PAGE_KEY = 'page';

interface UseAbilityListV4Result {
  /** 검색어로 거른 뒤 가나다순으로 정렬한 전체 목록 */
  filteredAbilities: Ability[];
  /** 현재 페이지에 보여줄 목록 */
  pagedAbilities: Ability[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  /** 현재 페이지에서 미리보기로 선택된 항목의 인덱스 */
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  selectedAbility: Ability | null;
  /** 전체 목록 기준 번호(1-base). 페이지가 넘어가도 이어진다. */
  getDisplayNumber: (indexInPage: number) => number;
}

/**
 * 검색(search) · 페이지(page) 쿼리를 읽어 목록을 만들고, 미리보기 선택 상태를 관리한다.
 *
 * - 검색은 AbilitySearch(useSearchParamsInput)가 router.replace로 쓰고, 여기서는 읽기만 한다.
 * - 페이지 이동은 router.push라 뒤로가기로 이전 페이지가 복원된다.
 * - 검색어가 바뀌어 결과가 줄면 page가 범위를 넘길 수 있어 항상 clamp한다.
 */
export default function useAbilityListV4(
  abilities: Ability[],
): UseAbilityListV4Result {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';

  const filteredAbilities = useMemo(() => {
    const matchesKeyword = createSearchMatcher(search);

    return abilities
      .filter(({ nameKo, nameEn, nameJa }) =>
        matchesKeyword(nameKo, nameEn, nameJa),
      )
      .sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
  }, [abilities, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAbilities.length / PAGE_SIZE),
  );

  const parsedPage = Number.parseInt(searchParams.get(PAGE_KEY) ?? '', 10);
  const currentPage = Number.isNaN(parsedPage)
    ? 1
    : Math.min(Math.max(parsedPage, 1), totalPages);

  const pageStart = (currentPage - 1) * PAGE_SIZE;

  const pagedAbilities = useMemo(
    () => filteredAbilities.slice(pageStart, pageStart + PAGE_SIZE),
    [filteredAbilities, pageStart],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  // 검색어·페이지가 바뀌면 미리보기를 첫 항목으로 되돌린다.
  // (이전 선택 인덱스가 새 목록 범위 밖을 가리키는 것을 막는다)
  useEffect(() => {
    setSelectedIndex(0);
  }, [search, currentPage]);

  const safeSelectedIndex =
    selectedIndex < pagedAbilities.length ? selectedIndex : 0;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // 1페이지는 파라미터를 남기지 않는다(첫 진입 URL과 문자열을 일치시킨다).
    if (page <= 1) {
      params.delete(PAGE_KEY);
    } else {
      params.set(PAGE_KEY, String(page));
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return {
    filteredAbilities,
    pagedAbilities,
    currentPage,
    totalPages,
    goToPage,
    selectedIndex: safeSelectedIndex,
    setSelectedIndex,
    selectedAbility: pagedAbilities[safeSelectedIndex] ?? null,
    getDisplayNumber: (indexInPage: number) => pageStart + indexInPage + 1,
  };
}
