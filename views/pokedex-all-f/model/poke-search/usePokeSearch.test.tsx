import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
import { usePokeSearch } from './usePokeSearch';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationTransitionProvider>{children}</NavigationTransitionProvider>
);

const lastUrl = () => String(nav.replace.mock.calls.at(-1)?.[0] ?? '');

beforeEach(() => {
  vi.useFakeTimers();
  nav.replace.mockClear();
  nav.params = new URLSearchParams();
});
afterEach(() => vi.useRealTimers());

describe('usePokeSearch', () => {
  it('URL의 search로 input 초기화', () => {
    nav.params = new URLSearchParams('search=꼬부기');
    const { result } = renderHook(() => usePokeSearch(), { wrapper });
    expect(result.current.input).toBe('꼬부기');
  });

  it('입력은 즉시 반영, 디바운스(250ms) 후 URL에 기록', () => {
    const { result } = renderHook(() => usePokeSearch(), { wrapper });

    act(() => result.current.onInputChange('피카'));
    expect(result.current.input).toBe('피카');
    expect(nav.replace).not.toHaveBeenCalled(); // 아직 디바운스 전

    act(() => vi.advanceTimersByTime(250));
    expect(lastUrl()).toContain('search=');
  });

  it('네비게이션으로 URL이 바뀌면 input이 URL을 따라간다(캐시 상태 역주입 방지)', () => {
    const { result, rerender } = renderHook(() => usePokeSearch(), { wrapper });
    expect(result.current.input).toBe('');

    // 외부 네비게이션으로 search가 채워짐
    nav.params = new URLSearchParams('search=파이리');
    rerender();
    expect(result.current.input).toBe('파이리');

    // 다시 검색 없는 URL로 진입 → input도 비워짐(역주입 없음)
    nav.params = new URLSearchParams();
    rerender();
    expect(result.current.input).toBe('');
  });

  it('clearSearch는 입력만 비운다', () => {
    nav.params = new URLSearchParams('search=리자몽');
    const { result } = renderHook(() => usePokeSearch(), { wrapper });
    act(() => result.current.clearSearch());
    expect(result.current.input).toBe('');
  });
});
