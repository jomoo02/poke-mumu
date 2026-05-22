import type { RefType } from './parse-display';

export interface ResolvedRef {
  label: string;
  href?: string;
  extra?: 'location';
}

export type RefResolver = (key: string) => ResolvedRef;

export type RefResolvers = Record<RefType, RefResolver>;

/** 누락 키 안전망: 어떤 resolver든 매핑 없으면 raw key 노출 */
export const fallback = (key: string): ResolvedRef => {
  return { label: key };
};
