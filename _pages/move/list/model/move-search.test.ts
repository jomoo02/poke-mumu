import { describe, it, expect } from 'vitest';

import { filterMovesByKeyword } from './move-search';
import { makeMove, names } from './move.fixture';

describe('filterMovesByKeyword', () => {
  const moves = [
    makeMove({
      nameKo: '냉동빔',
      nameEn: 'Ice Beam',
      nameJa: 'れいとうビーム',
    }),
    makeMove({
      nameKo: '파괴광선',
      nameEn: 'Hyper Beam',
      nameJa: 'はかいこうせん',
    }),
    makeMove({
      nameKo: '울트라대시어택',
      nameEn: 'Breakneck Blitz',
      nameJa: 'ウルトラダッシュアタック',
    }),
  ];

  it('검색어가 비면 전부 남긴다', () => {
    expect(filterMovesByKeyword(moves, '')).toHaveLength(3);
    expect(filterMovesByKeyword(moves, '   ')).toHaveLength(3);
  });

  it('한글 이름 부분 일치', () => {
    expect(names(filterMovesByKeyword(moves, '광선'))).toEqual(['파괴광선']);
  });

  it('영문 이름은 대소문자를 무시한다', () => {
    expect(names(filterMovesByKeyword(moves, 'BEAM'))).toEqual([
      '냉동빔',
      '파괴광선',
    ]);
  });

  it('일본어 이름으로도 찾는다', () => {
    expect(names(filterMovesByKeyword(moves, 'れいとう'))).toEqual(['냉동빔']);
  });

  it('띄어쓰기를 무시한다', () => {
    expect(names(filterMovesByKeyword(moves, '울트라 대시'))).toEqual([
      '울트라대시어택',
    ]);
  });

  it('자모 분리형(NFD) 검색어도 찾는다', () => {
    expect(
      names(filterMovesByKeyword(moves, '냉동빔'.normalize('NFD'))),
    ).toEqual(['냉동빔']);
  });

  it('일치하는 항목이 없으면 빈 배열', () => {
    expect(filterMovesByKeyword(moves, '없는기술')).toEqual([]);
  });
});
