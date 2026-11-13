import { describe, it, expect } from 'vitest';

import { makeMove, names } from '../../move/list-move.fixture';
import { filterMovesByKeyword } from '../search-moves';

describe('filterMovesByKeyword', () => {
  const moves = [
    makeMove({ nameKo: '화염방사', moveNumber: 53 }),
    makeMove({ nameKo: '10만볼트', moveNumber: 85 }),
    makeMove({ nameKo: '불꽃세례', moveNumber: 52 }),
  ];

  it('검색어가 비면 전부 남긴다', () => {
    expect(filterMovesByKeyword(moves, '')).toHaveLength(3);
    expect(filterMovesByKeyword(moves, '   ')).toHaveLength(3);
  });

  it('한글 이름 부분 일치', () => {
    expect(names(filterMovesByKeyword(moves, '볼트'))).toEqual(['10만볼트']);
  });

  it('띄어쓰기를 무시한다', () => {
    expect(names(filterMovesByKeyword(moves, '화염 방사'))).toEqual([
      '화염방사',
    ]);
  });

  it('자모 분리형(NFD) 검색어도 찾는다', () => {
    expect(names(filterMovesByKeyword(moves, '불꽃'.normalize('NFD')))).toEqual(
      ['불꽃세례'],
    );
  });

  it('기술 번호로는 찾지 않는다 (이름에 든 숫자는 찾는다)', () => {
    expect(filterMovesByKeyword(moves, '53')).toEqual([]);
    expect(names(filterMovesByKeyword(moves, '10'))).toEqual(['10만볼트']);
  });
});
