'use client';

import { useIsMobile } from '@/shared/model/useMobile';

import FormFilterDesktop from './desktop';
import FormFilterMobile from './mobile';

// 컨테이너 선택만 담당. UI는 desktop/mobile이 각자 구현, 로직은 useFormFilter 공유.
export default function FormFilter() {
  const isMobile = useIsMobile(768);

  return isMobile ? <FormFilterMobile /> : <FormFilterDesktop />;
}
