'use client';

import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import {
  POKE_FILTER_RULES,
  usePokeFilter,
  type PokeFilterOptions,
} from '@/_pages/pokedex/national-base-stats/model/poke-filter';
import { useResetConditions } from '@/_pages/pokedex/national-base-stats/model/use-reset-conditions';

interface PokeEmptyProps {
  filterOptions: PokeFilterOptions;
}

// 결과 0개. 켜진 조건(검색어·언어·필터)이 있으면 바로 처음으로 돌아가게 초기화 버튼을 둔다
// (4-6에서 정식 slice의 빈 결과로 합친다)
export default function PokeEmpty({ filterOptions }: PokeEmptyProps) {
  const { filter, isActive: isFilterActive } = usePokeFilter(filterOptions);

  const { isActive, reset } = useResetConditions(filterOptions);

  // 타입 필터는 AND라 두 타입을 고르면 그 복합 타입만 남는다는 것을 알려 준다
  const hint =
    filter.type.length >= (POKE_FILTER_RULES.type.max ?? Infinity)
      ? '고른 두 타입을 모두 가진 포켓몬만 보여요. 타입을 하나 빼 보세요'
      : isFilterActive
        ? '필터를 줄이거나 검색어를 바꿔 보세요'
        : '검색어를 바꿔 보세요';

  return (
    <div className="flex flex-col items-start gap-1 py-6">
      <p className="font-medium">조건에 맞는 포켓몬이 없어요</p>
      <p className="text-sm text-muted-foreground">{hint}</p>
      {isActive && (
        <Button
          variant="secondary"
          onClick={() => {
            reset();
            // 이 버튼은 사라지므로 포커스를 지금 보이는 필터 트리거로
            focusVisibleFilterTrigger();
          }}
          className={cn(
            'mt-3 h-10.5 px-4',
            'bg-input/50 dark:bg-input/70',
            '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
          )}
        >
          <RotateCwIcon aria-hidden />
          초기화
        </Button>
      )}
    </div>
  );
}
