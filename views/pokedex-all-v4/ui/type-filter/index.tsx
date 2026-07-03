'use client';

import { type Type } from '@/entities/type/model';
import { useIsMobile } from '@/shared/model/useMobile';

import TypeFilterDesktop from './desktop';
import TypeFilterMobile from './mobile';

export interface TypeFilterProps {
  types: Type[];
  max?: number;
}

// 컨테이너 선택만 담당. UI는 desktop/mobile이 각자 구현, 로직은 useTypeFilter 공유.
export default function TypeFilter(props: TypeFilterProps) {
  const isMobile = useIsMobile(768);

  return isMobile ? (
    <TypeFilterMobile {...props} />
  ) : (
    <TypeFilterDesktop {...props} />
  );
}
