'use client';

import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { FilterCheckboxControl } from '@/_shared/ui/filter';

import { useNameLanguage } from '../../model/name-language';
import type { PokeFilterOptions } from '../../model/poke-filter';
import { useResetConditions } from '../../model/use-reset-conditions';
import NameLanguageControl from '../name-language-control';
import { usePokeFilterGroups } from './use-poke-filter-groups';

interface PokeFilterRowProps {
  filterOptions: PokeFilterOptions;
  // 지금 결과 수 (시트의 '120마리 보기', 넓은 본문 줄 끝의 개수)
  resultCount: number;
  // 초기화 뒤 (버튼이 사라지므로 포커스를 옮긴다)
  onReset: () => void;
}

/**
 * 초기화(검색어·이름 언어·필터)는 켜진 게 있을 때만, 검색과 필터 묶음 사이(필터 줄 맨 앞)에 둔다.
 * 나타나면 필터 버튼이 오른쪽으로 밀리는 것은 받아들였다 (2026-10-28 결정)
 * 좁은 본문: [↻ 초기화 │ 한국어⌄ 타입⌄ 모습⌄ 세대⌄ ···]   ← 줄 전체가 가로 스크롤
 * 넓은 본문: [🔍 검색] [↻ 초기화 │ 한국어⌄ 타입⌄ 모습⌄ 세대⌄]          1,250 Pokémon
 */
export default function PokeFilterRow({
  filterOptions,
  resultCount,
  onReset,
}: PokeFilterRowProps) {
  const groups = usePokeFilterGroups(filterOptions);

  const { language, setLanguage } = useNameLanguage();

  const { isActive, reset } = useResetConditions(filterOptions);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      {/* p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
      <div className="-m-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar p-1">
        {isActive && (
          <>
            {/* 꺼진 필터 트리거와 같은 모양, 글자만 옅게 (필터가 아닌 동작임을 구분) */}
            <Button
              variant="secondary"
              onClick={() => {
                reset();
                onReset();
              }}
              aria-label="검색·필터 초기화"
              className={cn(
                'h-10 shrink-0 text-foreground/70',
                'bg-input/50 dark:bg-input/70',
                '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
              )}
            >
              <RotateCwIcon aria-hidden className="size-3.5" />
              초기화
            </Button>
            <div aria-hidden className="h-6 w-px shrink-0 bg-border" />
          </>
        )}
        <NameLanguageControl language={language} onChange={setLanguage} />
        {groups.map((group) => (
          <FilterCheckboxControl
            key={group.key}
            group={group}
            resultLabel={`${resultCount.toLocaleString('ko-KR')}마리 보기`}
            className="shrink-0"
          />
        ))}
      </div>

      {/* 넓은 본문: 줄 끝에 개수만 */}
      <p
        aria-live="polite"
        className="ml-auto hidden shrink-0 text-sm font-medium whitespace-nowrap text-foreground/70 @5xl/view:block"
      >
        {resultCount.toLocaleString('ko-KR')} Pokémon
      </p>
    </div>
  );
}
