'use client';

import { useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import AbilityListV2 from './ability-list-v2';

interface Props {
  abilities: Ability[];
}

export default function AbilityListSection({ abilities }: Props) {
  const { bfcacheId } = useRouter();
  const prevId = useRef(bfcacheId);

  useLayoutEffect(() => {
    // 최초 마운트(=새로고침/직접진입)에는 실행 안 됨 → 브라우저 복원 존중
    // push/replace로 bfcacheId가 바뀐 경우에만 맨 위로
    if (prevId.current !== bfcacheId) {
      window.scrollTo(0, 0);
      prevId.current = bfcacheId;
    }
  }, [bfcacheId]);

  // key가 바뀌면 virtualizer가 새 인스턴스로 리셋됨 (stale scrollOffset 제거)
  return <AbilityListV2 key={bfcacheId} abilities={abilities} />;
}
