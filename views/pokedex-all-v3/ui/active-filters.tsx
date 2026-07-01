'use client';

import { XIcon } from 'lucide-react';

import { type Type } from '@/entities/type/model';

import { FORM_FILTERS } from '../model/forms';

interface ActiveFiltersProps {
  types: Type[]; // identifier → nameKo 매핑용 전체 타입
  selectedTypes: string[];
  selectedForms: string[];
  onRemoveType: (identifier: string) => void;
  onRemoveForm: (identifier: string) => void;
}

// 현재 선택된 필터를 알약으로 표시. 클릭하면 해당 조건 삭제.
// 형태: "타입: 물", "모습: 메가 진화"
export default function ActiveFilters({
  types,
  selectedTypes,
  selectedForms,
  onRemoveType,
  onRemoveForm,
}: ActiveFiltersProps) {
  const typeLabel = (id: string) =>
    types.find((t) => t.identifier === id)?.nameKo ?? id;
  const formLabel = (id: string) =>
    FORM_FILTERS.find((f) => f.identifier === id)?.label ?? id;

  const pills = [
    ...selectedTypes.map((id) => ({
      key: `type:${id}`,
      label: `타입: ${typeLabel(id)}`,
      onRemove: () => onRemoveType(id),
    })),
    ...selectedForms.map((id) => ({
      key: `form:${id}`,
      label: `모습: ${formLabel(id)}`,
      onRemove: () => onRemoveForm(id),
    })),
  ];

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {pills.map((pill) => (
        <button
          key={pill.key}
          type="button"
          onClick={pill.onRemove}
          aria-label={`${pill.label} 필터 삭제`}
          className="group inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 hover:bg-muted pl-3 pr-2 h-8 text-sm leading-none transition-colors"
        >
          <span>{pill.label}</span>
          <XIcon className="size-3.5 text-muted-foreground group-hover:text-foreground" />
        </button>
      ))}
    </div>
  );
}
