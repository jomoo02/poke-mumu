import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import DesktopPagination from './desktop';

afterEach(cleanup);

// jsdom엔 ResizeObserver가 없어 DesktopPagination의 폭 측정 훅은 조기 반환한다
// (capacity는 초기값 유지). 여기선 폭-적응이 아니라 화살표 disabled·클릭 동작을 검증.

describe('DesktopPagination', () => {
  it('첫 페이지면 이전 버튼 비활성, 다음은 활성', () => {
    render(<DesktopPagination page={1} totalPages={20} onChange={vi.fn()} />);

    const prev = screen.getByLabelText('이전 페이지') as HTMLButtonElement;
    const next = screen.getByLabelText('다음 페이지') as HTMLButtonElement;

    expect(prev.disabled).toBe(true);
    expect(next.disabled).toBe(false);
  });

  it('마지막 페이지면 다음 버튼 비활성', () => {
    render(<DesktopPagination page={20} totalPages={20} onChange={vi.fn()} />);
    const next = screen.getByLabelText('다음 페이지') as HTMLButtonElement;
    expect(next.disabled).toBe(true);
  });

  it('다음 버튼 클릭 → onChange(page + 1)', () => {
    const onChange = vi.fn();
    render(<DesktopPagination page={1} totalPages={20} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('다음 페이지'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('번호 버튼 클릭 → 해당 페이지로 onChange', () => {
    const onChange = vi.fn();
    render(<DesktopPagination page={5} totalPages={20} onChange={onChange} />);
    // 1과 마지막은 항상 노출된다.
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
