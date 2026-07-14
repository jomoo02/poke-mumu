import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import PokeSearchInput from './index';

afterEach(cleanup);

describe('PokeSearchInput', () => {
  it('입력하면 onChange가 값과 함께 호출된다', () => {
    const onChange = vi.fn();
    render(<PokeSearchInput value="" onChange={onChange} />);

    const input = screen.getByLabelText('포켓몬 이름 또는 도감 번호 검색');
    fireEvent.change(input, { target: { value: '피카츄' } });

    expect(onChange).toHaveBeenCalledWith('피카츄');
  });

  it('값이 비면 지우기 버튼이 숨겨지고, 값이 있으면 보인다', () => {
    const { rerender } = render(
      <PokeSearchInput value="" onChange={vi.fn()} />,
    );
    const clearButton = screen.getByLabelText('검색어 지우기');
    expect(clearButton.className).toContain('hidden');

    rerender(<PokeSearchInput value="피카" onChange={vi.fn()} />);
    expect(clearButton.className).toContain('flex');
  });

  it('지우기 버튼 클릭 시 onChange("")', () => {
    const onChange = vi.fn();
    render(<PokeSearchInput value="피카" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('검색어 지우기'));
    expect(onChange).toHaveBeenCalledWith('');
  });
});
