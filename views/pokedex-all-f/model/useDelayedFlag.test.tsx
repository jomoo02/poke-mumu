import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useDelayedFlag from './useDelayedFlag';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useDelayedFlag', () => {
  it('flag가 delay 이전이면 false, 이후면 true', () => {
    const { result } = renderHook(() => useDelayedFlag(true, 150));

    expect(result.current).toBe(false);

    act(() => vi.advanceTimersByTime(149));
    expect(result.current).toBe(false);

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe(true);
  });

  it('flag가 false면 즉시 false', () => {
    const { result } = renderHook(() => useDelayedFlag(false, 150));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toBe(false);
  });

  it('delay 안에 flag가 꺼지면 true로 안 넘어감(flash 방지)', () => {
    const { result, rerender } = renderHook(
      ({ flag }) => useDelayedFlag(flag, 150),
      { initialProps: { flag: true } },
    );

    act(() => vi.advanceTimersByTime(100));
    rerender({ flag: false });
    act(() => vi.advanceTimersByTime(200));

    expect(result.current).toBe(false);
  });
});
