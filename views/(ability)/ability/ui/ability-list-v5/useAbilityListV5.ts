'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

import {
  buildIndexChips,
  groupAbilitiesByInitial,
  type AbilityIndexChip,
  type AbilityIndexGroup,
  type IndexKey,
} from './group-by-initial';

/** widgets/app-header 의 `h-13` (3.25rem = 52px). 헤더 높이가 바뀌면 함께 수정한다. */
const APP_HEADER_HEIGHT_PX = 52;

/**
 * 스크롤 스파이 기준선 = 헤더 + 색인 바 하단에서 이만큼 아래.
 * 앵커 착지 위치(124px)가 기준선(52 + 57 + 24 = 133px)보다 위에 오도록 잡는다.
 */
const SPY_LINE_OFFSET_PX = 24;

/** 문서 끝 판정 여유 (서브픽셀 반올림 대비) */
const BOTTOM_TOLERANCE_PX = 2;

interface UseAbilityListV5Result {
  /** 검색어로 거른 뒤 가나다순으로 정렬한 전체 목록 */
  filteredAbilities: Ability[];
  /** 초성별 섹션 (항목이 있는 초성만) */
  groups: AbilityIndexGroup[];
  /** 색인 바 칩 (14초성 + 필요 시 '#') */
  chips: AbilityIndexChip[];
  /** 현재 뷰포트에 걸친 섹션의 키 */
  activeKey: IndexKey | null;
  /** 칩 클릭 시 스크롤 스파이 판정을 기다리지 않고 즉시 활성 표시 */
  selectKey: (key: IndexKey) => void;
  /** 스파이 기준선 계산용 (sticky 색인 바의 실제 높이) */
  indexBarRef: RefObject<HTMLDivElement | null>;
}

/**
 * 검색(search) 쿼리를 읽어 목록을 초성별로 묶고, 스크롤 위치에 따라 활성 초성을 추적한다.
 *
 * - 검색은 AbilitySearch(useSearchParamsInput)가 router.replace로 쓰고, 여기서는 읽기만 한다.
 * - 초성 이동은 네이티브 앵커(`<a href="#...">`)가 담당한다. router는 쓰지 않는다.
 */
export default function useAbilityListV5(
  abilities: Ability[],
): UseAbilityListV5Result {
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

  const groups = useMemo(
    () => groupAbilitiesByInitial(filteredAbilities),
    [filteredAbilities],
  );

  const chips = useMemo(() => buildIndexChips(groups), [groups]);

  const indexBarRef = useRef<HTMLDivElement>(null);
  const [observedKey, setObservedKey] = useState<IndexKey | null>(null);

  // 칩 클릭으로 고른 키. 사용자가 직접 스크롤을 시작하기 전까지 스파이 판정보다 우선한다.
  // (문서 끝의 짧은 섹션은 앵커로 점프해도 기준선까지 올라오지 못한다)
  const pinnedKeyRef = useRef<IndexKey | null>(null);

  useEffect(() => {
    if (groups.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      if (pinnedKeyRef.current) {
        setObservedKey(pinnedKeyRef.current);
        return;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;

      // 문서 끝에 닿으면 짧은 마지막 섹션이 기준선을 넘지 못해도 활성으로 본다.
      if (atBottom) {
        setObservedKey(groups.at(-1)?.key ?? null);
        return;
      }

      const line =
        APP_HEADER_HEIGHT_PX +
        (indexBarRef.current?.offsetHeight ?? 0) +
        SPY_LINE_OFFSET_PX;

      // 기준선 위로 올라간 섹션 중 마지막 것. 아직 아무것도 넘지 않았으면 첫 섹션.
      let current = groups[0]?.key ?? null;

      for (const group of groups) {
        const section = document.getElementById(group.anchorId);

        if (!section || section.getBoundingClientRect().top > line) break;

        current = group.key;
      }

      setObservedKey(current);
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    // 휠·포인터·키 입력은 사용자가 직접 움직이기 시작했다는 신호 → 클릭 고정을 푼다.
    // 칩 클릭은 pointerdown/keydown 뒤에 click이 오므로 고정이 다시 걸린다.
    const releasePin = () => {
      pinnedKeyRef.current = null;
    };

    scheduleUpdate();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('wheel', releasePin, { passive: true });
    window.addEventListener('pointerdown', releasePin, { passive: true });
    window.addEventListener('keydown', releasePin);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('wheel', releasePin);
      window.removeEventListener('pointerdown', releasePin);
      window.removeEventListener('keydown', releasePin);
    };
  }, [groups]);

  const selectKey = (key: IndexKey) => {
    pinnedKeyRef.current = key;
    setObservedKey(key);
  };

  // 검색으로 그룹 구성이 바뀌어 이전 키가 사라졌다면 활성 표시를 비운다.
  const activeKey = groups.some((group) => group.key === observedKey)
    ? observedKey
    : null;

  return {
    filteredAbilities,
    groups,
    chips,
    activeKey,
    selectKey,
    indexBarRef,
  };
}
