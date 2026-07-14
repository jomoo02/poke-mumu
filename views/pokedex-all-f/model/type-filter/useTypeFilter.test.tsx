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
import { useTypeFilter } from './useTypeFilter';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationTransitionProvider>{children}</NavigationTransitionProvider>
);

const lastUrl = () => String(nav.replace.mock.calls.at(-1)?.[0] ?? '');

beforeEach(() => {
  nav.replace.mockClear();
  nav.params = new URLSearchParams();
});

describe('useTypeFilter', () => {
  it('선택 없으면 isActive false, 선택 있으면 true', () => {
    const { result, rerender } = renderHook(() => useTypeFilter(2), {
      wrapper,
    });
    expect(result.current.isActive).toBe(false);
    expect(result.current.isSelectedType('fire')).toBe(false);

    nav.params = new URLSearchParams('type=fire');
    rerender();
    expect(result.current.isActive).toBe(true);
    expect(result.current.isSelectedType('fire')).toBe(true);
    expect(result.current.selectedTypes).toEqual(['fire']);
  });

  it('상한(max) 도달 시 미선택 항목은 disabled, 선택 항목은 아님', () => {
    nav.params = new URLSearchParams('type=fire&type=water');
    const { result } = renderHook(() => useTypeFilter(2), { wrapper });

    expect(result.current.isDisabledType('grass')).toBe(true); // 미선택 + 가득
    expect(result.current.isDisabledType('fire')).toBe(false); // 선택된 건 해제 가능
  });

  it('toggleType → type 파라미터 반영', () => {
    const { result } = renderHook(() => useTypeFilter(2), { wrapper });
    act(() => result.current.toggleType('fire'));
    expect(lastUrl()).toContain('type=fire');
  });

  it('resetType → type 파라미터 제거', () => {
    nav.params = new URLSearchParams('type=fire');
    const { result } = renderHook(() => useTypeFilter(2), { wrapper });
    act(() => result.current.resetType());
    expect(lastUrl()).not.toContain('type=');
  });
});
