'use client';

import { type Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

interface TypeFilterProps {
  types: Type[]; // 선택 가능한 전체 타입 목록(18종)
  selected: string[]; // 선택된 identifier 목록
  onToggle: (identifier: string) => void;
  max?: number; // 최대 선택 개수(기본 2). 도달 시 미선택 타입 비활성화.
}

// 고정 정방 그리드(B안), controlled.
export default function TypeFilter({
  types,
  selected,
  onToggle,
  max = 2,
}: TypeFilterProps) {
  const set = new Set(selected);
  const reachedMax = selected.length >= max;

  return (
    <div className="grid grid-cols-4 gap-2">
      {types.map((type) => {
        const { identifier, nameKo } = type;
        const active = set.has(identifier);
        // 최대 도달 시 미선택 타입은 선택 불가 + 흐리게.
        const disabled = !active && reachedMax;

        return (
          <button
            key={identifier}
            type="button"
            onClick={() => onToggle(identifier)}
            aria-pressed={active}
            disabled={disabled}
            className={cn(
              'flex flex-col items-center gap-2 rounded-xl border px-1 py-2.5',
              'text-sm leading-none transition-colors',
              !active && 'border-border hover:bg-muted/50',
              disabled && 'opacity-40 pointer-events-none hover:bg-transparent',
              active ? 'border-primary bg-primary/10' : '',
            )}
            // 런타임 색상은 인라인 style + color-mix로 처리(Tailwind 동적 클래스 금지).
          >
            <TypeIcon type={type} className="size-7" />
            <span className="text-foreground/70">{nameKo}</span>
          </button>
        );
      })}
    </div>
  );
}
