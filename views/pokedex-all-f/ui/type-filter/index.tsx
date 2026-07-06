'use client';

import { type Type } from '@/entities/type/model';

import TypeFilterDesktop from './desktop';
import TypeFilterMobile from './mobile';

export interface TypeFilterProps {
  types: Type[];
  max?: number;
  isMobile: boolean;
}

export default function TypeFilter({ types, max, isMobile }: TypeFilterProps) {
  return isMobile ? (
    <TypeFilterMobile types={types} max={max} />
  ) : (
    <TypeFilterDesktop types={types} max={max} />
  );
}
