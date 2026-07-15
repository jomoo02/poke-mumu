import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';

const nav = vi.hoisted(() => ({
  replace: vi.fn(),
  push: vi.fn(),
  params: new URLSearchParams(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: nav.replace, push: nav.push }),
  usePathname: () => '/pokedex/all',
  useSearchParams: () => nav.params,
}));

import { NavigationTransitionProvider } from '../search-params';
import { useFormFilter } from './useFormFilter';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationTransitionProvider>{children}</NavigationTransitionProvider>
);

const lastUrl = () => String(nav.replace.mock.calls.at(-1)?.[0] ?? '');

beforeEach(() => {
  nav.replace.mockClear();
  nav.params = new URLSearchParams();
});

describe('useFormFilter', () => {
  it('선택 상태를 반영한다', () => {
    nav.params = new URLSearchParams('form=mega');
    const { result } = renderHook(() => useFormFilter(), { wrapper });

    expect(result.current.isActive).toBe(true);
    expect(result.current.isSelectedForm('mega')).toBe(true);
    expect(result.current.isSelectedForm('alola')).toBe(false);
    expect(result.current.selectedForms).toEqual(['mega']);
  });

  it('toggleForm → form 파라미터 반영', () => {
    const { result } = renderHook(() => useFormFilter(), { wrapper });
    act(() => result.current.toggleForm('mega'));
    expect(lastUrl()).toContain('form=mega');
  });

  it('resetForm → form 파라미터 제거', () => {
    nav.params = new URLSearchParams('form=mega');
    const { result } = renderHook(() => useFormFilter(), { wrapper });
    act(() => result.current.resetForm());
    expect(lastUrl()).not.toContain('form=');
  });
});
