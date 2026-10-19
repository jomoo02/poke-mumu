import { memo, type CSSProperties } from 'react';
import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import {
  PokeSprite,
  getPokeHref,
  getPokeName,
  getPokeTypes,
} from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';
import type {
  BaseStatsPoke,
  StatKey,
} from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';

import {
  NARROW_GRID_CLASS,
  NARROW_TOP_CLASS,
  SORTED_CELL_CLASS,
  STAT_COLUMNS,
  TOTAL_COLUMN_ID,
  WIDE_GRID_CLASS,
} from './table-layout';

interface StatTableRowProps {
  poke: BaseStatsPoke;
  // 가상화 테이블에서만: 위치(absolute + translateY)와 aria-rowindex(헤더가 1)
  style?: CSSProperties;
  rowIndex?: number;
}

/*
 * 한 벌의 요소를 본문 폭에 따라 다르게 배치한다 (두 레이아웃을 따로 그리지 않아 DOM이 절반)
 * 행이 약 1,250개라 요소 수가 정렬(DOM 이동)·hydration 비용을 정한다. 이미지는 <img>(native), 수치는 칸에 글자로 바로 둔다
 * - @5xl 미만: 2줄. [스프라이트 | No.번호 / 이름 | 타입] / 능력치 7칸 (HP … 스피드 총합)
 *   능력치 줄은 머리글 둘째 줄과 같은 7칸 grid라 칸이 맞는다
 * - @5xl 이상: 윗줄 묶음이 display: contents로 풀려 [번호 | 스프라이트 | 이름 | 타입 | 능력치 7칸] 한 줄 11칸
 *   (# 열이 번호·스프라이트 두 칸이다. 좁은 본문에서 둘이 떨어져 있어서)
 * 링크는 이름 하나. ::after로 행 전체를 덮어 행 어디를 눌러도 이동한다
 * (::after는 행을 기준으로 놓여 이름 칸의 말줄임(overflow: hidden)에 잘리지 않는다)
 * 정렬 중인 열은 테이블 루트의 data-sort를 CSS가 읽어 칠하므로, 정렬을 바꿔도 이 행은 다시 그려지지 않는다
 */
function StatTableRow({ poke, style, rowIndex }: StatTableRowProps) {
  return (
    <div
      role="row"
      aria-rowindex={rowIndex}
      style={style}
      className={cn(
        'h-(--row-h) border-b last:border-b-0',
        style ? 'absolute inset-x-0 top-0' : 'relative',
        NARROW_GRID_CLASS,
        'content-center gap-y-2 py-3 @5xl:py-0',
        WIDE_GRID_CLASS,
        '[@media(hover:hover)]:hover:bg-muted/70',
      )}
    >
      <div role="none" className={cn(NARROW_TOP_CLASS, 'px-1 @5xl:px-0')}>
        {/* 좁은 본문: 둥근 회색 타일 안의 스프라이트 (/pokedex/national 모바일과 같다).
            넓은 본문: 타일 없이 # 열 둘째 칸 (번호 → 스프라이트, 기존 테이블 순서) */}
        <PokeSprite
          poke={poke}
          alt=""
          native
          className={cn(
            'size-16 shrink-0 rounded-2xl bg-muted/70 p-1.75',
            '@5xl:col-start-2 @5xl:row-start-1 @5xl:size-12.5 @5xl:rounded-none @5xl:bg-transparent @5xl:p-0',
          )}
        />
        {/* 좁은 본문: No.번호 / 이름 두 줄. 넓은 본문: 묶음이 풀려 번호(# 열 첫째 칸)·이름 열 */}
        <div
          role="none"
          className="flex min-w-0 flex-1 flex-col @5xl:contents"
        >
          <div
            role="cell"
            className={cn(
              "text-sm font-medium text-foreground/70 tabular-nums before:content-['No.']",
              '@5xl:col-start-1 @5xl:row-start-1 @5xl:py-3.5 @5xl:pl-3.5 @5xl:text-md @5xl:font-normal @5xl:text-foreground @5xl:before:content-none',
            )}
          >
            {String(poke.dexNumber).padStart(4, '0')}
          </div>
          <div role="cell" className="min-w-0 @5xl:p-3.5">
            <Link
              href={getPokeHref(poke)}
              prefetch={false}
              className={cn(
                'block truncate text-md font-medium outline-none',
                'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
                'after:absolute after:inset-0',
              )}
            >
              {getPokeName(poke)}
            </Link>
          </div>
        </div>
        <div
          role="cell"
          className="shrink-0 @5xl:flex @5xl:justify-center @5xl:p-3.5"
        >
          {/* 단일 타입도 두 칸 폭을 잡아 위아래 행의 첫째 타입이 열처럼 맞는다 (PokeTypes와 같다) */}
          <div className="grid grid-cols-2 gap-1">
            {getPokeTypes(poke).map((type) => (
              <TypeIcon key={type.identifier} type={type} native />
            ))}
          </div>
        </div>
      </div>

      {/* 능력치 7칸: @5xl 이상은 타입 다음 칸부터 총합 → 능력치 순으로 오른쪽 정렬,
          미만은 아랫줄 가운데 정렬이고 총합은 머리글처럼 끝 칸 */}
      {STAT_COLUMNS.map((column) => {
        const key = column.id as StatKey;
        const isTotal = column.id === TOTAL_COLUMN_ID;

        return (
          <div
            key={column.id}
            role="cell"
            className={cn(
              // 줄높이까지 text-sm(20px)이어야 행 높이(--row-h) 계산과 맞는다.
              // tabular-nums로 자릿수 폭을 고정해 세로로 끝선이 맞게 한다 (StatValue와 같다)
              'text-center text-md tabular-nums @max-5xl:rounded-md @max-5xl:text-sm @5xl:p-3.5 @5xl:text-right',
              // 총합은 능력치와 구분되게 조금 굵게
              isTotal && '@max-5xl:order-last font-medium',
              SORTED_CELL_CLASS[key],
            )}
          >
            {poke.stats[key]}
          </div>
        );
      })}
    </div>
  );
}

export default memo(StatTableRow);
