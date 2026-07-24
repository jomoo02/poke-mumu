'use client';

import { useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Move } from '@/entities/move/model';
import { createSearchMatcher } from '@/shared/lib/search';

import { SEARCH_PARAMS, DEFAULT_SORT, VALID_SORT_VALUES } from '../../config';

export default function useMoveList(moves: Move[]) {
  const searchParams = useSearchParams();

  // 목록 렌더를 저우선순위로 만든다. 필터가 넓어질 때(예: 검색어 삭제 → few→902)
  // 수백 개 카드를 새로 마운트하는 무거운 렌더가 발생하는데, 이를 차단(blocking)
  // 렌더로 두면 그 사이 타이핑이 밀려 버벅인다. deferredParamsKey로 필터 결과를
  // 지연·중단 가능하게 만들면, 입력이 들어올 때 렌더를 멈추고 입력을 먼저 처리한다.
  const paramsKey = searchParams.toString();
  const deferredParamsKey = useDeferredValue(paramsKey);

  const filteredMoves = useMemo(() => {
    const params = new URLSearchParams(deferredParamsKey);

    const matchesKeyword = createSearchMatcher(
      params.get(SEARCH_PARAMS.SEARCH) ?? '',
    );

    const selectedTypes = new Set(params.getAll(SEARCH_PARAMS.TYPE));
    const selectedClasses = new Set(params.getAll(SEARCH_PARAMS.DAMAGE_CLASS));

    const rawSort = params.get(SEARCH_PARAMS.SORT) ?? DEFAULT_SORT;
    const sort = VALID_SORT_VALUES.has(rawSort) ? rawSort : DEFAULT_SORT;

    const byId = (a: Move, b: Move) => a.id - b.id;
    const byName = (a: Move, b: Move) => a.nameKo.localeCompare(b.nameKo, 'ko');

    const filtered = moves.filter((move) => {
      const matchesType =
        selectedTypes.size === 0 || selectedTypes.has(move.typeIdentifier);

      const matchesClass =
        selectedClasses.size === 0 ||
        selectedClasses.has(move.damageClassIdentifier);

      return (
        matchesKeyword(move.nameKo, move.nameEn, move.nameJa) &&
        matchesType &&
        matchesClass
      );
    });

    // 기본순: 원본 데이터(move.id) 순서.
    if (sort === 'default') {
      return filtered.sort(byId);
    }

    if (sort === 'name_asc') {
      return filtered.sort(byName);
    }

    if (sort === 'name_desc') {
      return filtered.sort((a, b) => byName(b, a));
    }

    // 위력순(power_asc | power_desc). null(위력 미기재)은 방향과 무관하게 항상 뒤로.
    const dir = sort === 'power_asc' ? 1 : -1;

    return filtered.sort((a, b) => {
      const av = a.power;
      const bv = b.power;

      if (av == null && bv == null) return byId(a, b);
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av === bv) return byId(a, b);

      return (av - bv) * dir;
    });
  }, [moves, deferredParamsKey]);

  return { filteredMoves };
}
