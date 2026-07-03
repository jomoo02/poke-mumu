'use client';

import { useIsMobile } from '@/shared/model/useMobile';

import PokeSortDesktop from './desktop';
import PokeSortMobile from './mobile';

// 컨테이너 선택만 담당. UI는 desktop/mobile이 각자 자유롭게 구현.
export default function PokeSort() {
  const isMobile = useIsMobile(768);

  return isMobile ? <PokeSortMobile /> : <PokeSortDesktop />;
}
