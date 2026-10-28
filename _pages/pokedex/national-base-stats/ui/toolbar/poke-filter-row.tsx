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
 * 좁은 본문: [한국어⌄ 타입⌄ 모습⌄ 세대⌄ ··· │ ↻]   ← 버튼만 가로 스크롤, ↻는 오른쪽 끝에 고정
 * 넓은 본문: [한국어⌄ 타입⌄ 모습⌄ 세대⌄]      [↻ 초기화] | 1,250 Pokémon
 * 초기화(검색어·이름 언어·필터)는 켜진 게 있을 때만. 두 본문 모두 필터 줄의 오른쪽 끝이다
 */
export default function PokeFilterRow({
  filterOptions,
  resultCount,
  onReset,
}: PokeFilterRowProps) {
  const groups = usePokeFilterGroups(filterOptions);

  const { language, setLanguage } = useNameLanguage();

  const { isActive, reset } = useResetConditions(filterOptions);

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      {/* p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게.
          좁은 본문에서 ↻가 붙으면 오른쪽 끝을 흐려 뒤에 버튼이 더 있음을 보인다 */}
      <div
        className={cn(
          '-m-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar p-1',
          isActive &&
            '[mask-image:linear-gradient(to_right,black_calc(100%-1.5rem),transparent)] @5xl/view:[mask-image:none]',
        )}
      >
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

      {/* 좁은 본문: 아이콘만 (결과 줄은 개수 ↔ 정렬로 이미 찼다) */}
      {isActive && (
        <div className="flex shrink-0 items-center gap-1 @5xl/view:hidden">
          <div aria-hidden className="h-6 w-px bg-border" />
          <Button
            variant="ghost"
            onClick={handleReset}
            aria-label="검색·필터 초기화"
            className="size-10 rounded-xl text-foreground/70"
          >
            <RotateCwIcon aria-hidden className="size-4.5" />
          </Button>
        </div>
      )}

      {/* 넓은 본문: [↻ 초기화] | 개수. 개수는 오른쪽 끝에 고정되고 초기화는 그 왼쪽에 나타난다 */}
      <div className="ml-auto hidden shrink-0 items-center gap-3 @5xl/view:flex">
        {isActive && (
          <>
            <Button
              variant="ghost"
              onClick={handleReset}
              aria-label="검색·필터 초기화"
              className="h-9 rounded-xl px-3 text-foreground/70"
            >
              <RotateCwIcon aria-hidden className="size-3.5" />
              초기화
            </Button>
            <div aria-hidden className="h-4 w-px bg-border" />
          </>
        )}
        <p
          aria-live="polite"
          className="text-sm font-medium whitespace-nowrap text-foreground/70"
        >
          {resultCount.toLocaleString('ko-KR')} Pokémon
        </p>
      </div>
    </div>
  );
}
