import { describe, it, expect } from 'vitest';

import { buildPageHref } from './page-href';

describe('buildPageHref', () => {
  it('2페이지 이상이면 page 파라미터를 설정한다', () => {
    expect(buildPageHref('/ability', new URLSearchParams(), 2, 4)).toBe(
      '/ability?page=2',
    );
  });

  it('1페이지는 기본값이라 page 파라미터를 지운다', () => {
    expect(
      buildPageHref('/ability', new URLSearchParams('page=3'), 1, 4),
    ).toBe('/ability');
  });

  it('쿼리가 비면 ? 없이 pathname만 남긴다', () => {
    expect(buildPageHref('/ability', new URLSearchParams(), 1, 4)).toBe(
      '/ability',
    );
  });

  it('범위를 벗어나면 1 ~ totalPages로 보정한다', () => {
    expect(buildPageHref('/ability', new URLSearchParams(), 99, 4)).toBe(
      '/ability?page=4',
    );
    expect(buildPageHref('/ability', new URLSearchParams(), 0, 4)).toBe(
      '/ability',
    );
  });

  it('다른 파라미터와 위치를 유지한다', () => {
    expect(
      buildPageHref(
        '/ability',
        new URLSearchParams('sort=appearance&page=3&order=desc'),
        2,
        4,
      ),
    ).toBe('/ability?sort=appearance&page=2&order=desc');
  });

  it('한글 검색어는 인코딩된 채로 유지한다', () => {
    expect(
      buildPageHref('/ability', new URLSearchParams('search=파'), 2, 4),
    ).toBe('/ability?search=%ED%8C%8C&page=2');
  });

  it('paramName으로 다른 키를 쓸 수 있다', () => {
    expect(
      buildPageHref('/move', new URLSearchParams('p=2'), 3, 5, 'p'),
    ).toBe('/move?p=3');
  });

  it('입력 searchParams를 변형하지 않는다', () => {
    const params = new URLSearchParams('page=3');

    buildPageHref('/ability', params, 1, 4);

    expect(params.toString()).toBe('page=3');
  });
});
