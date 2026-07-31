'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Move } from '@/entities/move/model';

import { BASE_COUNT, STEP } from './config';

export default function useVisible(moves: Move[]) {
  const searchParams = useSearchParams();
  const paramsKey = searchParams.toString();

  const [visibleCount, setVisibleCount] = useState(BASE_COUNT);

  const [prevParamsKey, setPrevParamsKey] = useState(paramsKey);

  if (paramsKey !== prevParamsKey) {
    setPrevParamsKey(paramsKey);
    setVisibleCount(BASE_COUNT);
  }

  const visibleMoves = moves.slice(0, visibleCount);

  const remaining = moves.length - visibleMoves.length;

  const maxPage = Math.ceil(moves.length / BASE_COUNT);

  const currentPage = Math.min(
    Math.ceil(visibleMoves.length / BASE_COUNT),
    maxPage,
  );

  const moreButtonContent = `더보기 (${currentPage}/${maxPage})`;

  const nextVisibleCount = () => {
    setVisibleCount((prev) => prev + STEP);
  };

  return {
    visibleMoves,
    remaining,
    moreButtonContent,
    nextVisibleCount,
  };
}
