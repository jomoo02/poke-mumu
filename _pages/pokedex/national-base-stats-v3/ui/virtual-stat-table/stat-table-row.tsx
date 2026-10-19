import Link from 'next/link';
import type { CSSProperties } from 'react';

import { cn } from '@/_shared/lib/cn';
import { PokeSprite, getPokeHref, getPokeName } from '@/_entities/poke';
import {
  STAT_LABEL,
  type BaseStatsPoke,
  type StatKey,
} from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { SortKey } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import StatValue from '@/_pages/pokedex/national-base-stats/ui/results/stat-value';
import PokeTypes from '@/_pages/pokedex/national-base-stats/ui/results/poke-types';

import { usesColumnHead, type SortUi } from '../../model/use-sort-ui';
import {
  CELL_CLASS,
  INFO_COLUMNS,
  NARROW_GRID_CLASS,
  NARROW_TOP_GRID_CLASS,
  NARROW_TOP_SPAN_CLASS,
  SIX_STAT_COLUMNS,
  STAT_COLUMNS,
  STAT_LETTER,
  TOTAL_COLUMN,
  WIDE_GRID_CLASS,
} from './table-layout';

interface StatTableRowProps {
  poke: BaseStatsPoke;
  // 좁은 화면 정렬 UI (비교용). 7칸 머리글이면 아랫줄 7칸, 칩 바면 종족값 윗줄 + 6칸
  sortUi: SortUi;
  // 숫자 위에 한 글자 라벨을 붙일지 (머리글이 없을 때)
  showStatLabel: boolean;
  // 지금 정렬 기준. @5xl 미만에선 그 칸에 배경을 깔고 굵게 한다
  sortKey: SortKey;
  // aria-rowindex (헤더가 1)
  rowIndex: number;
  isLast: boolean;
  // 가상화 위치 (absolute + translateY). 없으면 일반 흐름으로 쌓는다 (content-visibility 테이블)
  style?: CSSProperties;
}

const NAME_LINK_CLASS = cn(
  'relative block min-w-0 truncate font-medium outline-none',
  'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
);

// @5xl 미만 정렬 중인 칸. 행마다 같은 자리에 쌓여 열이 칠해진 것처럼 보이고, 머리글 알약과 같은 모양이다
const SORTED_CELL_CLASS = '@max-5xl:rounded-md @max-5xl:bg-muted';

/*
 * @5xl 미만: 2줄. 윗줄은 [스프라이트 번호 | 이름 타입 (| 종족값: 칩 바)], 아랫줄은 능력치
 *   - 7칸 머리글(letter·segment): H A B C D S 합 7칸
 *   - 칩 바(chip): H A B C D S 6칸 (합계는 윗줄 끝)
 *   머리글이 보이면(능력치순) 숫자만, 아니면 숫자 위에 한 글자 라벨
 * @5xl 이상: 기존과 같은 한 줄 10열. 윗줄은 숨기고 #·이름·타입·종족값 칸을 보인다
 * 같은 내용을 본문 폭에 따라 다른 칸에 그리므로 안 보이는 쪽은 display:none(스크린리더에서도 빠진다)
 * 행 전체 클릭은 오버레이 링크(포인터 전용), 키보드·스크린리더는 이름 링크를 쓴다
 */
export default function StatTableRow({
  poke,
  sortUi,
  showStatLabel,
  sortKey,
  rowIndex,
  isLast,
  style,
}: StatTableRowProps) {
  const href = getPokeHref(poke);

  const layout = usesColumnHead(sortUi) ? 'column' : 'chip';

  // 칩 바: 능력치 6종 중 하나로 정렬 중이면 그 숫자가 눈에 띄게 윗줄 종족값은 보통 굵기로 낮춘다
  const isSixStatSorted = SIX_STAT_COLUMNS.some(
    (column) => column.sortKey === sortKey,
  );

  return (
    <div
      role="row"
      aria-rowindex={rowIndex}
      style={style}
      className={cn(
        'group h-(--row-h) border-b',
        // 가상화: 바디 안 절대 위치 / 일반 흐름: 오버레이 링크의 기준만
        style ? 'absolute inset-x-0 top-0' : 'relative',
        isLast && 'border-b-0',
        NARROW_GRID_CLASS[layout],
        'content-center gap-y-2 py-3 @5xl:py-0',
        WIDE_GRID_CLASS,
        '[@media(hover:hover)]:hover:bg-muted/70',
      )}
    >
      <Link
        href={href}
        aria-hidden
        tabIndex={-1}
        prefetch={false}
        className="absolute inset-0 z-1"
      />

      {/* @5xl 미만 윗줄 */}
      <div
        role="none"
        className={cn(
          NARROW_TOP_GRID_CLASS[layout],
          NARROW_TOP_SPAN_CLASS[layout],
          'px-1 @5xl:hidden',
        )}
      >
        <div role="cell" className="flex items-center gap-2">
          <PokeSprite poke={poke} alt="" className="size-12 shrink-0" />
          <span className="text-sm font-medium tabular-nums text-foreground/70">
            {String(poke.dexNumber).padStart(4, '0')}
          </span>
        </div>
        <div role="cell" className="flex min-w-0 items-center gap-2">
          <Link href={href} className={cn(NAME_LINK_CLASS, 'text-md')}>
            {getPokeName(poke)}
          </Link>
          <PokeTypes poke={poke} className="ml-auto shrink-0" />
        </div>
        {layout === 'chip' && (
          <div role="cell" className="text-right">
            <span
              className={cn(
                'inline-block rounded-md px-1.5',
                sortKey === TOTAL_COLUMN.sortKey && 'bg-muted',
              )}
            >
              <StatValue
                value={poke.stats.total}
                className={cn(
                  'text-md',
                  isSixStatSorted ? 'font-medium' : 'font-semibold',
                )}
              />
            </span>
          </div>
        )}
      </div>

      {/* @5xl 이상: 기존과 같은 #·이름·타입 칸 */}
      {INFO_COLUMNS.map((column) => (
        <div
          key={column.id}
          role="cell"
          className={cn(
            CELL_CLASS,
            'hidden',
            column.id === 'type'
              ? '@5xl:flex @5xl:justify-center'
              : '@5xl:block',
          )}
        >
          {column.id === 'name' ? (
            <Link href={href} className={NAME_LINK_CLASS}>
              {getPokeName(poke)}
            </Link>
          ) : (
            column.cell(poke)
          )}
        </div>
      ))}

      {/* 능력치: @5xl 이상은 기존처럼 종족값부터 7칸 오른쪽 정렬, 미만은 아랫줄 가운데 정렬 */}
      {STAT_COLUMNS.map((column) => {
        const key = column.id as StatKey;
        const isTotal = column.id === TOTAL_COLUMN.id;

        return (
          <div
            key={column.id}
            role="cell"
            className={cn(
              // 줄높이까지 text-sm(20px)이어야 행 높이(--row-h) 계산과 맞는다
              'text-center @max-5xl:text-sm @5xl:p-3.5 @5xl:text-right',
              // 7칸 머리글: 합계를 아랫줄 끝으로 / 칩 바: 합계는 윗줄에 있어 숨긴다
              isTotal &&
                (layout === 'column'
                  ? '@max-5xl:order-last'
                  : '@max-5xl:hidden'),
              key === sortKey && SORTED_CELL_CLASS,
            )}
          >
            {/* 칸 머리글이 없을 때 값 위에 한 글자 라벨을 붙인다 (스크린리더는 전체 이름) */}
            {showStatLabel && (
              <span className="block text-xs font-medium text-foreground/70 @5xl:hidden">
                <span aria-hidden>{STAT_LETTER[key]}</span>
                <span className="sr-only">{STAT_LABEL[key]}</span>
              </span>
            )}
            <StatValue
              value={poke.stats[key]}
              className={cn(
                'text-md @max-5xl:text-sm',
                // 종족값(합계)은 능력치와 구분되게 굵게. 좁은 화면은 정렬 중인 능력치도
                isTotal && 'font-semibold',
                key === sortKey && '@max-5xl:font-semibold',
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
