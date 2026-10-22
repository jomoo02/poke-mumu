import { memo, type CSSProperties } from 'react';
import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { PokeSprite, getPokeHref, getPokeTypes } from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';
import {
  STAT_LABEL,
  STAT_SHORT_LABEL,
  type BaseStatsPoke,
  type StatKey,
} from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';

import type { NameLanguage } from '../../model/name-language';

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
  // 이름 표기 언어. 바꾸면 모든 행이 다시 그려진다 (자주 바꾸지 않는다)
  language: NameLanguage;
  // 가상화 테이블에서만: 위치(absolute + translateY)와 aria-rowindex(헤더가 1)
  style?: CSSProperties;
  rowIndex?: number;
}

/*
 * 한 벌의 요소를 본문 폭에 따라 다르게 배치한다 (두 레이아웃을 따로 그리지 않아 DOM이 절반)
 * 행이 약 1,250개라 요소 수가 정렬(DOM 이동)·hydration 비용을 정한다. 수치는 칸에 글자로 바로 둔다.
 * 이미지는 next/image
 * - @5xl 미만: 2줄 카드. [스프라이트 | 번호 | 이름 / 모습 | 타입] / 능력치 7칸 (HP … 스피드 총합)
 *   머리글이 없어 칸마다 능력치 이름을 숫자 위에 둔다 (스크린리더도 '공격 130'으로 읽는다)
 * - @5xl 이상: 윗줄 묶음이 display: contents로 풀려 [스프라이트 | 번호 | 이름 / 모습 | 타입 | 능력치 7칸] 한 줄 11칸
 *   (도감번호 열이 스프라이트·번호 두 칸이다. 카드와 같은 순서·같은 요소)
 * 링크는 이름 하나. ::after로 행 전체를 덮어 행 어디를 눌러도 이동한다
 * (::after는 행을 기준으로 놓여 이름 칸의 말줄임(overflow: hidden)에 잘리지 않는다)
 * 정렬 중인 열은 테이블 루트의 data-sort를 CSS가 읽어 칠하므로, 정렬을 바꿔도 이 행은 다시 그려지지 않는다
 */
// 이름 / 모습 (폼 정식 이름: 가라르의 모습 · Galarian · ガラルのすがた).
// 모습은 약칭이 있는 폼(shortKo)에만 붙인다. 메가진화처럼 이름에 폼이 이미 들어간 경우는 없다
// (3단계에서 name-language model로 옮긴다)
const getBaseName = (poke: BaseStatsPoke, language: NameLanguage) =>
  language === 'ko'
    ? poke.nameKo
    : language === 'en'
      ? poke.nameEn
      : poke.nameJa;

const getFormName = (poke: BaseStatsPoke, language: NameLanguage) =>
  !poke.form?.shortKo
    ? null
    : language === 'ko'
      ? poke.form.nameKo
      : language === 'en'
        ? poke.form.nameEn
        : poke.form.nameJa;

function StatTableRow({ poke, language, style, rowIndex }: StatTableRowProps) {
  const formName = getFormName(poke, language);

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
            넓은 본문: 타일 없이 도감번호 열의 첫 칸 (열 왼쪽 여백 14px) */}
        <div
          className={cn(
            'size-16 shrink-0 rounded-2xl bg-muted/70 p-1.75',
            '@5xl:col-start-1 @5xl:row-start-1 @5xl:ml-3.5 @5xl:size-12.5 @5xl:rounded-none @5xl:bg-transparent @5xl:p-0',
          )}
        >
          <PokeSprite poke={poke} alt="" className="size-full" />
        </div>
        {/* 좁은 본문: [번호 | 이름 / 모습] 한 줄. 넓은 본문: 묶음이 풀려 번호(도감번호 열 둘째 칸)·이름 열 */}
        <div
          role="none"
          className="flex min-w-0 flex-1 items-center gap-x-3 @5xl:contents"
        >
          <div
            role="cell"
            className={cn(
              'shrink-0 text-sm font-medium text-foreground/70 tabular-nums',
              // 도감번호순일 때 primary 글자색 (정렬 중인 능력치 칸과 같은 표시)
              '@max-5xl:group-data-[sort=dexNumber]/table:text-primary-text',
              // 넓은 본문: 이미지 바로 뒤에 붙인다 (칸 간격 12 - 4 = 8px). 네 자리 고정이라 왼쪽 정렬
              '@5xl:col-start-2 @5xl:row-start-1 @5xl:-ml-1 @5xl:py-3.5 @5xl:text-md @5xl:font-normal @5xl:text-foreground',
            )}
          >
            {String(poke.dexNumber).padStart(4, '0')}
          </div>
          {/* 이름 / 모습 두 줄 (모습은 읽는 정보라 text-sm).
              넓은 본문은 칸이 69px라 위아래 여백을 12로 줄인다 (12 + 21 + 20 + 12 = 65) */}
          <div role="cell" className="min-w-0 flex-1 @5xl:px-3.5 @5xl:py-3">
            <Link
              href={getPokeHref(poke)}
              prefetch={false}
              // 영어·일본어 이름은 그 언어로 읽히고 글꼴도 맞게 (페이지는 ko)
              lang={language === 'ko' ? undefined : language}
              className={cn(
                'block truncate text-md font-medium outline-none',
                // 이름순일 때 primary 글자색
                '@max-5xl:group-data-[sort=name]/table:text-primary-text',
                'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
                'after:absolute after:inset-0',
              )}
            >
              {getBaseName(poke, language)}
            </Link>
            {formName && (
              <div
                lang={language === 'ko' ? undefined : language}
                className="truncate text-sm text-foreground/70 @max-5xl:mt-0.5"
              >
                {formName}
              </div>
            )}
          </div>
        </div>
        <div role="cell" className="shrink-0 @5xl:flex @5xl:p-3.5">
          {/* 단일 타입도 두 칸 폭을 잡아 위아래 행의 첫째 타입이 열처럼 맞는다 (PokeTypes와 같다) */}
          <div className="grid grid-cols-2 gap-1">
            {getPokeTypes(poke).map((type) => (
              <TypeIcon key={type.identifier} type={type} />
            ))}
          </div>
        </div>
      </div>

      {/* 능력치 7칸 (HP … 스피드 → 총합): @5xl 이상은 타입 다음 칸부터 오른쪽 정렬,
          미만은 아랫줄에 이름 / 숫자 두 줄로 가운데 정렬 */}
      {STAT_COLUMNS.map((column) => {
        const key = column.id as StatKey;
        const isTotal = column.id === TOTAL_COLUMN_ID;

        return (
          <div
            key={column.id}
            role="cell"
            className={cn(
              // tabular-nums로 자릿수 폭을 고정해 세로로 끝선이 맞게 한다 (StatValue와 같다)
              'text-md tabular-nums @5xl:p-3.5 @5xl:text-right',
              // 줄높이까지 이름 text-xs(16px) + 숫자 text-sm(20px) + py-0.5여야 행 높이(--row-h) 계산과 맞는다
              '@max-5xl:flex @max-5xl:flex-col @max-5xl:items-center @max-5xl:rounded-md @max-5xl:py-0.5 @max-5xl:text-sm',
              // 총합은 능력치와 구분되게 조금 굵게 (열 순서상 맨 끝)
              isTotal && 'font-medium',
              SORTED_CELL_CLASS[key],
            )}
          >
            {/* 넓은 본문에선 머리글이 있어 숨긴다 (display: none이라 스크린리더도 건너뛴다).
                화면엔 줄인 이름(특공), 스크린리더엔 정식 이름(특수공격) */}
            <span className="text-xs font-medium text-foreground/70 @5xl:hidden">
              {STAT_SHORT_LABEL[key] === STAT_LABEL[key] ? (
                STAT_LABEL[key]
              ) : (
                <>
                  <span aria-hidden>{STAT_SHORT_LABEL[key]}</span>
                  <span className="sr-only">{STAT_LABEL[key]}</span>
                </>
              )}
            </span>
            {poke.stats[key]}
          </div>
        );
      })}
    </div>
  );
}

export default memo(StatTableRow);
