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
  // 시트의 닫기 버튼 문구 (예: '120마리 보기')
  resultLabel: string;
  // 초기화 뒤 (버튼이 사라지므로 포커스를 옮긴다)
  onReset: () => void;
}

/**
 * [↻ 초기화] │ [한국어 ⌄] [모든 타입 ⌄] [모든 모습 ⌄] [모든 세대 ⌄]   ← 넘치면 가로 스크롤
 * 모바일·데스크탑 모두 한 줄. 각 버튼은 md 미만 시트, 이상 팝오버 (그룹마다 따로).
 * 초기화(검색어·이름 언어·필터)는 켜진 게 있을 때만 맨 앞에 (맨 뒤면 모바일에서 스크롤해야 보인다)
 */
export default function PokeFilterRow({
  filterOptions,
  resultLabel,
  onReset,
}: PokeFilterRowProps) {
  const groups = usePokeFilterGroups(filterOptions);

  const { language, setLanguage } = useNameLanguage();

  const { isActive, reset } = useResetConditions(filterOptions);

  return (
    // p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게
    <div className="-m-1 flex items-center gap-2 overflow-x-auto no-scrollbar p-1">
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
          resultLabel={resultLabel}
          className="shrink-0"
        />
      ))}
    </div>
  );
}
