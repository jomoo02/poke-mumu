import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import Pagination from './index';

// index는 모바일(Select)·데스크톱(번호창)을 모두 렌더한다. Select는 내부적으로
// ResizeObserver를 쓰므로 jsdom에서 최소 stub을 제공한다.
beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

afterEach(cleanup);

describe('Pagination (이전/다음 공통 + 콘텐츠 분기)', () => {
  it('totalPages <= 1이면 렌더하지 않는다', () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onChange={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('첫 페이지: 이전 비활성, 다음 활성', () => {
    render(<Pagination page={1} totalPages={20} onChange={vi.fn()} />);
    expect(
      (screen.getByLabelText('이전 페이지') as HTMLButtonElement).disabled,
    ).toBe(true);
    expect(
      (screen.getByLabelText('다음 페이지') as HTMLButtonElement).disabled,
    ).toBe(false);
  });

  it('마지막 페이지: 다음 비활성', () => {
    render(<Pagination page={20} totalPages={20} onChange={vi.fn()} />);
    expect(
      (screen.getByLabelText('다음 페이지') as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it('이전/다음 클릭 → onChange(page ∓ 1)', () => {
    const onChange = vi.fn();
    render(<Pagination page={5} totalPages={20} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('다음 페이지'));
    expect(onChange).toHaveBeenCalledWith(6);

    fireEvent.click(screen.getByLabelText('이전 페이지'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
