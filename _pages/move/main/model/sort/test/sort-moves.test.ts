import { describe, it, expect } from 'vitest';

import { makeMove, names } from '../../move/list-move.fixture';
import { sortMoves, type MoveSort } from '../sort-moves';

const sortNames = (...args: Parameters<typeof sortMoves>) =>
  names(sortMoves(...args));

const by = (sort: MoveSort['sort'], order: MoveSort['order']): MoveSort => ({
  sort,
  order,
});

describe('sortMoves', () => {
  describe('이름', () => {
    const moves = [
      makeMove({ nameKo: '화염방사' }),
      makeMove({ nameKo: '10만볼트' }),
      makeMove({ nameKo: '3연화살' }),
      makeMove({ nameKo: '막치기' }),
    ];

    it('asc: 숫자 → 한글 순 (숫자는 값으로 비교)', () => {
      expect(sortNames(moves, by('name', 'asc'))).toEqual([
        '3연화살',
        '10만볼트',
        '막치기',
        '화염방사',
      ]);
    });

    it('desc: 반대순', () => {
      expect(sortNames(moves, by('name', 'desc'))).toEqual([
        '화염방사',
        '막치기',
        '10만볼트',
        '3연화살',
      ]);
    });
  });

  describe('수치', () => {
    const moves = [
      makeMove({ nameKo: '칼춤', moveNumber: 14, power: null }),
      makeMove({ nameKo: '화염방사', moveNumber: 53, power: 90 }),
      makeMove({ nameKo: '막치기', moveNumber: 1, power: 40 }),
      makeMove({ nameKo: '10만볼트', moveNumber: 85, power: 90 }),
      makeMove({ nameKo: '방어', moveNumber: 182, power: null }),
    ];

    it('asc: 낮은 순, 같은 값은 번호순, 값 없음은 맨 뒤(번호순)', () => {
      expect(sortNames(moves, by('power', 'asc'))).toEqual([
        '막치기',
        '화염방사',
        '10만볼트',
        '칼춤',
        '방어',
      ]);
    });

    it('desc: 높은 순, 같은 값은 번호 반대순, 값 없음은 여전히 맨 뒤(번호 반대순)', () => {
      expect(sortNames(moves, by('power', 'desc'))).toEqual([
        '10만볼트',
        '화염방사',
        '막치기',
        '방어',
        '칼춤',
      ]);
    });
  });

  it('원본 배열을 바꾸지 않는다', () => {
    const moves = [
      makeMove({ nameKo: '화염방사' }),
      makeMove({ nameKo: '막치기' }),
    ];

    sortMoves(moves, by('name', 'asc'));

    expect(names(moves)).toEqual(['화염방사', '막치기']);
  });
});
