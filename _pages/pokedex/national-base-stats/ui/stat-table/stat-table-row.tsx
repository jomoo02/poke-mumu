import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { PokeSprite, getPokeHref, getPokeTypes } from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';

import { STAT_KEYS, type BaseStatsPoke } from '../../model/base-stats-poke';
import {
  getBaseName,
  getFormName,
  type NameLanguage,
} from '../../model/name-language';

import { GRID_CLASS } from './table-layout';

interface StatTableRowProps {
  poke: BaseStatsPoke;
  // 이름 표기 언어
  language: NameLanguage;
}

/*
 * 한 줄 11칸: [스프라이트 | 번호 | 이름 / 모습 | 타입 | 능력치 7칸] (도감번호 열이 스프라이트·번호 두 칸)
 * 링크는 이름 / 모습 묶음 하나 (모습까지 링크 이름이라 같은 이름의 폼을 화면 낭독기도 구분한다).
 * ::after로 행 전체를 덮어 행 어디를 눌러도 이동한다
 * (::after는 행을 기준으로 놓여 이름 칸의 말줄임(overflow: hidden)에 잘리지 않는다)
 */
export default function StatTableRow({ poke, language }: StatTableRowProps) {
  const formName = getFormName(poke, language);

  return (
    <div
      role="row"
      className={cn(
        'relative h-17.25 border-b last:border-b-0',
        GRID_CLASS,
        '[@media(hover:hover)]:hover:bg-muted/70',
      )}
    >
      {/* 도감번호 열 첫 칸: 타일 없는 스프라이트 (열 왼쪽 여백 14px) */}
      <div role="none" className="ml-3.5 size-12.5">
        <PokeSprite poke={poke} alt="" className="size-full" />
      </div>
      {/* 이미지 바로 뒤에 붙인다 (칸 간격 12 - 4 = 8px). 네 자리 고정 */}
      <div
        role="cell"
        className="-ml-1 py-3.5 text-center text-md tabular-nums"
      >
        {String(poke.dexNumber).padStart(4, '0')}
      </div>
      {/* 이름 / 모습 두 줄 (모습은 읽는 정보라 text-sm). 둘 다 링크 안이라 링크 이름은 '라이츄, 알로라의 모습' */}
      <div role="cell" className="min-w-0 px-3.5 py-3">
        <Link
          href={getPokeHref(poke)}
          prefetch={false}
          // 영어·일본어 이름은 그 언어로 읽히고 글꼴도 맞게 (페이지는 ko)
          lang={language === 'ko' ? undefined : language}
          className={cn(
            'block outline-none',
            'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'after:absolute after:inset-0',
          )}
        >
          <span className="block truncate text-md font-medium">
            {getBaseName(poke, language)}
          </span>
          {formName && (
            <>
              {/* 이름과 모습이 붙어 읽히지 않게 (줄바꿈은 화면에만 보인다) */}
              <span className="sr-only">, </span>
              <span className="block truncate text-sm text-foreground/70">
                {formName}
              </span>
            </>
          )}
        </Link>
      </div>
      <div role="cell" className="flex p-3.5">
        {/* 단일 타입도 두 칸 폭을 잡아 위아래 행의 첫째 타입이 열처럼 맞는다 (PokeTypes와 같다) */}
        <div className="grid grid-cols-2 gap-1">
          {getPokeTypes(poke).map((type) => (
            <TypeIcon key={type.identifier} type={type} />
          ))}
        </div>
      </div>
      {/* 능력치 7칸 (HP … 스피드 → 총합). tabular-nums로 자릿수 폭을 고정해 끝선이 맞게 */}
      {STAT_KEYS.map((key) => (
        <div
          key={key}
          role="cell"
          className={cn(
            'p-3.5 text-right text-md tabular-nums',
            // 총합은 능력치와 구분되게 조금 굵게 (열 순서상 맨 끝)
            key === 'total' && 'font-medium',
          )}
        >
          {poke.stats[key]}
        </div>
      ))}
    </div>
  );
}
