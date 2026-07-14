import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import DesktopPagination from './desktop';

afterEach(cleanup);

// jsdom엔 ResizeObserver가 없어 폭 측정 훅은 조기 반환한다(capacity 초기값 유지).
// 여기선 번호창 자체의 렌더/클릭만 검증(이전/다음 화살표는 index로 이동 → index 테스트에서).

describe('DesktopPagination (번호창)', () => {
  it('첫·마지막 페이지 번호는 항상 노출', () => {
    render(<DesktopPagination page={10} totalPages={20} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: '1' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '20' })).toBeTruthy();
  });

  it('번호 클릭 → 해당 페이지로 onChange', () => {
    const onChange = vi.fn();
    render(<DesktopPagination page={5} totalPages={20} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('현재 페이지 버튼은 disabled', () => {
    render(<DesktopPagination page={1} totalPages={20} onChange={vi.fn()} />);
    expect(
      (screen.getByRole('button', { name: '1' }) as HTMLButtonElement).disabled,
    ).toBe(true);
  });
});
