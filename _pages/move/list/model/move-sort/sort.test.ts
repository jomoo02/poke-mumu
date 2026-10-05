import { describe, it, expect } from 'vitest';

import { sortMoves, type MoveSort } from './sort';
import { makeMove, names } from '../move.fixture';

const sortNames = (...args: Parameters<typeof sortMoves>) =>
  names(sortMoves(...args));

const asc = (sort: MoveSort['sort']): MoveSort => ({ sort, order: 'asc' });
const desc = (sort: MoveSort['sort']): MoveSort => ({ sort, order: 'desc' });

describe('sortMoves', () => {
  describe('번호', () => {
    const moves = [
      makeMove({ nameKo: '필살피카슛', moveNumber: 658 }),
      makeMove({ nameKo: '막치기', moveNumber: 1 }),
      makeMove({ nameKo: '울트라대시어택', moveNumber: 622 }),
    ];

    it('asc: 공식 번호 순', () => {
      expect(sortNames(moves, asc('moveNumber'))).toEqual([
        '막치기',
        '울트라대시어택',
        '필살피카슛',
      ]);
    });

    it('desc: 공식 번호 역순', () => {
      expect(sortNames(moves, desc('moveNumber'))).toEqual([
        '필살피카슛',
        '울트라대시어택',
        '막치기',
      ]);
    });
  });

  describe('이름', () => {
    const moves = [
      makeMove({ nameKo: '파도타기' }),
      makeMove({ nameKo: '냉동빔' }),
      makeMove({ nameKo: '화염방사' }),
    ];

    it('asc: 가나다순', () => {
      expect(sortNames(moves, asc('name'))).toEqual([
        '냉동빔',
        '파도타기',
        '화염방사',
      ]);
    });

    it('desc: 가나다 역순', () => {
      expect(sortNames(moves, desc('name'))).toEqual([
        '화염방사',
        '파도타기',
        '냉동빔',
      ]);
    });

    it('숫자 → 한글 → 영어, 숫자는 값 크기로 비교', () => {
      const mixed = [
        makeMove({ nameKo: 'V제너레이트' }),
        makeMove({ nameKo: '1000만볼트' }),
        makeMove({ nameKo: '냉동빔' }),
        makeMove({ nameKo: '3연화살' }),
        makeMove({ nameKo: '10만볼트' }),
      ];

      expect(sortNames(mixed, asc('name'))).toEqual([
        '3연화살',
        '10만볼트',
        '1000만볼트',
        '냉동빔',
        'V제너레이트',
      ]);
    });
  });

  describe('수치(위력·명중·PP)', () => {
    const moves = [
      makeMove({ nameKo: '칼춤', power: null }),
      makeMove({ nameKo: '화염방사', power: 90 }),
      makeMove({ nameKo: '냉동빔', power: 90 }),
      makeMove({ nameKo: '불꽃세례', power: 40 }),
      makeMove({ nameKo: '검은안개', power: null }),
    ];

    it('asc: 낮은 순, 같은 값은 가나다순, null은 맨 뒤', () => {
      expect(sortNames(moves, asc('power'))).toEqual([
        '불꽃세례',
        '냉동빔',
        '화염방사',
        '검은안개',
        '칼춤',
      ]);
    });

    it('desc: 높은 순, 같은 값은 이름 역순, null은 맨 뒤(이름 역순)', () => {
      expect(sortNames(moves, desc('power'))).toEqual([
        '화염방사',
        '냉동빔',
        '불꽃세례',
        '칼춤',
        '검은안개',
      ]);
    });

    it('명중 null(필중기)도 방향과 무관하게 맨 뒤', () => {
      const accuracyMoves = [
        makeMove({ nameKo: '스피드스타', accuracy: null }),
        makeMove({ nameKo: '번개', accuracy: 70 }),
        makeMove({ nameKo: '10만볼트', accuracy: 100 }),
      ];

      expect(sortNames(accuracyMoves, desc('accuracy'))).toEqual([
        '10만볼트',
        '번개',
        '스피드스타',
      ]);
      expect(sortNames(accuracyMoves, asc('accuracy'))).toEqual([
        '번개',
        '10만볼트',
        '스피드스타',
      ]);
    });

    it('PP도 같은 규칙', () => {
      const ppMoves = [
        makeMove({ nameKo: '냉동빔', pp: 10 }),
        makeMove({ nameKo: '몸통박치기', pp: 35 }),
      ];

      expect(sortNames(ppMoves, desc('pp'))).toEqual(['몸통박치기', '냉동빔']);
    });
  });

  it('원본 배열을 바꾸지 않는다', () => {
    const moves = [
      makeMove({ nameKo: '화염방사' }),
      makeMove({ nameKo: '냉동빔' }),
    ];

    sortMoves(moves, asc('name'));

    expect(names(moves)).toEqual(['화염방사', '냉동빔']);
  });
});
