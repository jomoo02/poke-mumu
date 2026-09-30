'use client';

import { useMemo } from 'react';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import type { Type } from '@/_entities/type';
import type { DamageClass } from '@/_entities/damage-class';

import MoveFilter from './move-filter';
import {
  buildDamageClassFilterConfig,
  buildTypeFilterConfig,
} from './move-filter/filter-config';
import { useMoveFilterReset } from '../model/use-move-filter-reset';

interface MoveToolbarProps {
  types: Type[];
  damageClasses: DamageClass[];
}

// 필터 줄: [필터 초기화(활성일 때만)] [타입] [분류]
// 정렬은 목록 쪽(테이블 헤더, lg 미만은 개수 줄의 정렬 버튼)에 둔다.
// 트리거 문구가 선택을 전부 나열해 길어질 수 있어 한 줄 가로 스크롤로 둔다
export default function MoveToolbar({
  types,
  damageClasses,
}: MoveToolbarProps) {
  const { isActive, reset } = useMoveFilterReset();

  const typeFilterConfig = useMemo(() => buildTypeFilterConfig(types), [types]);

  const damageClassFilterConfig = useMemo(
    () => buildDamageClassFilterConfig(damageClasses),
    [damageClasses],
  );

  return (
    // p-1 -m-1: 버튼 포커스 링이 overflow에 잘리지 않게 bleed
    <div className="flex gap-3 overflow-x-auto no-scrollbar p-1 -m-1">
      {isActive && (
        <Button
          variant={'secondary'}
          aria-label="필터 초기화"
          onClick={reset}
          className={cn(
            'size-10.5 shrink-0 bg-input/50 dark:bg-input/70',
            '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
          )}
        >
          <RotateCwIcon />
        </Button>
      )}
      <MoveFilter config={typeFilterConfig} />
      <MoveFilter config={damageClassFilterConfig} />
    </div>
  );
}
