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
import { DEFAULT_SORT_DIR, DEFAULT_SORT_KEY } from './config';
import { usePokeSort } from './usePokeSort';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationTransitionProvider>{children}</NavigationTransitionProvider>
);

const lastUrl = () => String(nav.replace.mock.calls.at(-1)?.[0] ?? '');

beforeEach(() => {
  nav.replace.mockClear();
  nav.params = new URLSearchParams();
});

describe('usePokeSort', () => {
  it('기본값이면 isActive false', () => {
    const { result } = renderHook(() => usePokeSort(), { wrapper });
    expect(result.current.sortKey).toBe(DEFAULT_SORT_KEY);
    expect(result.current.sortDir).toBe(DEFAULT_SORT_DIR);
    expect(result.current.isActive).toBe(false);
  });

  it('sort/dir 파라미터를 읽고 isActive true', () => {
    nav.params = new URLSearchParams('sort=attack&dir=desc');
    const { result } = renderHook(() => usePokeSort(), { wrapper });
    expect(result.current.sortKey).toBe('attack');
    expect(result.current.sortDir).toBe('desc');
    expect(result.current.isActive).toBe(true);
  });

  it('changeSortKey: 유효 키는 반영, 기본 키는 파라미터 제거', () => {
    const { result } = renderHook(() => usePokeSort(), { wrapper });

    act(() => result.current.changeSortKey('attack'));
    expect(lastUrl()).toContain('sort=attack');

    act(() => result.current.changeSortKey(DEFAULT_SORT_KEY));
    expect(lastUrl()).not.toContain('sort=');
  });

  it('changeSortKey: 무효 키는 no-op', () => {
    const { result } = renderHook(() => usePokeSort(), { wrapper });
    act(() => result.current.changeSortKey('nope'));
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it('changeSortDir: 기본 방향이면 파라미터 제거', () => {
    const { result } = renderHook(() => usePokeSort(), { wrapper });

    act(() => result.current.changeSortDir('desc'));
    expect(lastUrl()).toContain('dir=desc');

    act(() => result.current.changeSortDir(DEFAULT_SORT_DIR));
    expect(lastUrl()).not.toContain('dir=');
  });

  it('resetSort → sort·dir 모두 제거', () => {
    nav.params = new URLSearchParams('sort=attack&dir=desc');
    const { result } = renderHook(() => usePokeSort(), { wrapper });
    act(() => result.current.resetSort());
    const url = lastUrl();
    expect(url).not.toContain('sort=');
    expect(url).not.toContain('dir=');
  });
});
