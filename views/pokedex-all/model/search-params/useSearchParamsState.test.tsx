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

import { NavigationTransitionProvider } from './index';
import { useSearchParamsState } from './useSearchParamsState';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationTransitionProvider>{children}</NavigationTransitionProvider>
);

beforeEach(() => {
  nav.replace.mockClear();
  nav.push.mockClear();
  nav.params = new URLSearchParams();
});

const lastReplaceUrl = () => String(nav.replace.mock.calls.at(-1)?.[0] ?? '');

describe('useSearchParamsState', () => {
  it('setParams: 스칼라 값 세팅 + page 리셋(기본)', () => {
    nav.params = new URLSearchParams('page=3');
    const { result } = renderHook(() => useSearchParamsState(), { wrapper });

    act(() => result.current.setParams({ sort: 'attack' }));

    const url = lastReplaceUrl();
    expect(url).toContain('sort=attack');
    expect(url).not.toContain('page='); // 기본은 page 리셋
  });

  it('setParams: keepPage 옵션이면 page 유지', () => {
    nav.params = new URLSearchParams('page=3');
    const { result } = renderHook(() => useSearchParamsState(), { wrapper });

    act(() => result.current.setParams({ page: '4' }, { keepPage: true }));

    expect(lastReplaceUrl()).toContain('page=4');
  });

  it('setParams: null이면 파라미터 제거', () => {
    nav.params = new URLSearchParams('sort=attack');
    const { result } = renderHook(() => useSearchParamsState(), { wrapper });

    act(() => result.current.setParams({ sort: null }));

    expect(lastReplaceUrl()).not.toContain('sort=');
  });

  it('setParams: history:push면 push 사용', () => {
    const { result } = renderHook(() => useSearchParamsState(), { wrapper });

    act(() =>
      result.current.setParams({ sort: 'attack' }, { history: 'push' }),
    );

    expect(nav.push).toHaveBeenCalled();
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it('toggleParam: 없으면 추가, 있으면 제거(다중 값)', () => {
    const { result, rerender } = renderHook(() => useSearchParamsState(), {
      wrapper,
    });

    act(() => result.current.toggleParam('type', 'fire'));
    expect(lastReplaceUrl()).toContain('type=fire');

    // 이미 fire가 있는 상태에서 다시 토글 → 제거
    nav.params = new URLSearchParams('type=fire');
    rerender();
    act(() => result.current.toggleParam('type', 'fire'));
    expect(lastReplaceUrl()).not.toContain('type=fire');
  });
});
