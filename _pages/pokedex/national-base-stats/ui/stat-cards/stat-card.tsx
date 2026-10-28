import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { PokeSprite, getPokeHref, getPokeTypes } from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';

import {
  STAT_KEYS,
  STAT_LABEL,
  STAT_SHORT_LABEL,
  type BaseStatsPoke,
  type StatKey,
} from '../../model/base-stats-poke';
import {
  getBaseName,
  getFormName,
  type NameLanguage,
} from '../../model/name-language';

interface StatCardProps {
  poke: BaseStatsPoke;
  // 이름 표기 언어
  language: NameLanguage;
}

// 정렬 중인 칸: 숫자·이름을 primary 글자색 + 숫자 굵게 (배경 없음).
// 선택된 상태 = primary (정렬 시트 radio·필터 checkbox와 같은 색). 카드마다 같은 자리라 세로 줄처럼 이어진다.
// 이름(span)은 자기 글자색(text-foreground/70)이 있어 *: 로 자식까지 칠한다.
// Tailwind가 클래스를 찾을 수 있게 능력치마다 문자열을 그대로 적는다
const SORTED_CELL_CLASS: Record<StatKey, string> = {
  total:
    'group-data-[sort=total]/cards:font-semibold group-data-[sort=total]/cards:text-primary-text group-data-[sort=total]/cards:*:text-primary-text',
  hp: 'group-data-[sort=hp]/cards:font-semibold group-data-[sort=hp]/cards:text-primary-text group-data-[sort=hp]/cards:*:text-primary-text',
  attack:
    'group-data-[sort=attack]/cards:font-semibold group-data-[sort=attack]/cards:text-primary-text group-data-[sort=attack]/cards:*:text-primary-text',
  defense:
    'group-data-[sort=defense]/cards:font-semibold group-data-[sort=defense]/cards:text-primary-text group-data-[sort=defense]/cards:*:text-primary-text',
  specialAttack:
    'group-data-[sort=specialAttack]/cards:font-semibold group-data-[sort=specialAttack]/cards:text-primary-text group-data-[sort=specialAttack]/cards:*:text-primary-text',
  specialDefense:
    'group-data-[sort=specialDefense]/cards:font-semibold group-data-[sort=specialDefense]/cards:text-primary-text group-data-[sort=specialDefense]/cards:*:text-primary-text',
  speed:
    'group-data-[sort=speed]/cards:font-semibold group-data-[sort=speed]/cards:text-primary-text group-data-[sort=speed]/cards:*:text-primary-text',
};

/*
 * 2줄 카드
 * - 윗줄: [스프라이트 타일 | 번호 | 이름 / 모습 | 타입]
 * - 아랫줄: 능력치 7칸 (HP … 스피드 총합). 머리글이 없어 칸마다 능력치 이름을 숫자 위에 둔다
 *   (스크린리더도 '공격 130'으로 읽는다). 344px(본문 312px)에서 칸 약 41px, 가장 긴 이름 '스피드'(text-xs) 약 36px
 * 링크는 이름 / 모습 묶음 하나. ::after로 카드 전체를 덮어 어디를 눌러도 이동한다
 */
export default function StatCard({ poke, language }: StatCardProps) {
  const formName = getFormName(poke, language);

  return (
    <li
      className={cn(
        'relative flex flex-col gap-y-5 border-b py-3 last:border-b-0',
        '[@media(hover:hover)]:hover:bg-muted/70',
      )}
    >
      <div className="flex min-w-0 items-center gap-x-3.5 px-1">
        {/* 둥근 회색 타일 안의 스프라이트 (/pokedex/national 모바일과 같다) */}
        <div className="size-16 shrink-0 rounded-2xl bg-muted/70 p-1.75">
          <PokeSprite poke={poke} alt="" className="size-full" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-x-3">
          <span
            className={cn(
              'shrink-0 text-sm font-medium text-foreground/70 tabular-nums',
              // 도감번호순일 때 primary 글자색 (정렬 중인 능력치 칸과 같은 표시)
              'group-data-[sort=dexNumber]/cards:text-primary-text',
            )}
          >
            {String(poke.dexNumber).padStart(4, '0')}
          </span>
          {/* 이름 / 모습 두 줄. 둘 다 링크 안이라 링크 이름은 '라이츄, 알로라의 모습' */}
          <Link
            href={getPokeHref(poke)}
            prefetch={false}
            // 영어·일본어 이름은 그 언어로 읽히고 글꼴도 맞게 (페이지는 ko)
            lang={language === 'ko' ? undefined : language}
            className={cn(
              'block min-w-0 flex-1 outline-none',
              'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'after:absolute after:inset-0',
            )}
          >
            <span
              className={cn(
                'block truncate text-md font-medium',
                // 이름순일 때 primary 글자색
                'group-data-[sort=name]/cards:text-primary-text',
              )}
            >
              {getBaseName(poke, language)}
            </span>
            {formName && (
              <>
                {/* 이름과 모습이 붙어 읽히지 않게 (줄바꿈은 화면에만 보인다) */}
                <span className="sr-only">, </span>
                <span className="mt-0.5 block truncate text-sm text-foreground/70">
                  {formName}
                </span>
              </>
            )}
          </Link>
        </div>
        {/* 단일 타입도 두 칸 폭을 잡아 위아래 카드의 첫째 타입이 열처럼 맞는다 (PokeTypes와 같다) */}
        <div className="grid shrink-0 grid-cols-2 gap-1">
          {getPokeTypes(poke).map((type) => (
            <TypeIcon key={type.identifier} type={type} />
          ))}
        </div>
      </div>

      <dl className="grid grid-cols-7 gap-x-1">
        {STAT_KEYS.map((key) => (
          <div
            key={key}
            className={cn(
              'flex flex-col items-center rounded-md py-0.5 text-sm tabular-nums',
              // 총합은 능력치와 구분되게 조금 굵게 (열 순서상 맨 끝)
              key === 'total' && 'font-medium',
              SORTED_CELL_CLASS[key],
            )}
          >
            {/* 화면엔 줄인 이름(특공), 스크린리더엔 정식 이름(특수공격) */}
            <dt className="text-xs font-medium text-foreground/70">
              {STAT_SHORT_LABEL[key] === STAT_LABEL[key] ? (
                STAT_LABEL[key]
              ) : (
                <>
                  <span aria-hidden>{STAT_SHORT_LABEL[key]}</span>
                  <span className="sr-only">{STAT_LABEL[key]}</span>
                </>
              )}
            </dt>
            <dd>{poke.stats[key]}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}
