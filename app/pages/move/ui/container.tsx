'use client';

import { type MoveView } from '../model';
import useMoveFilter, {
  SORT_OPTIONS,
  type SortValue,
} from '../model/useMoveFilter';
import { Input } from '@/app/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select';
import MoveList from './move-list';
import DamageClassFilter from './damage-class-filter';
import TypeFilter from './type-filter';
import { cn } from '@/app/shared/lib/cn';

interface Props {
  moves: MoveView[];
}

export default function Container({ moves }: Props) {
  const {
    filtered,
    facets,
    search,
    setSearch,
    sortKey,
    setSortKey,
    activeTypes,
    toggleType,
    activeDamageClasses,
    toggleDamageClass,
    resetFilters,
    isFiltering,
    totalCount,
    isPending,
  } = useMoveFilter(moves);

  return (
    <div className="flex flex-col gap-6">
      {/* ── 분류 토글 ── */}
      <DamageClassFilter
        damageClasses={facets.damageClasses}
        toggleDamageClass={toggleDamageClass}
        activeDamageClasses={activeDamageClasses}
      />
      {/* ── 타입 토글 ── */}
      <TypeFilter
        types={facets.types}
        toggleType={toggleType}
        activeTypes={activeTypes}
      />
      {/* ── 카운트 + 초기화 ── */}
      <div>
        <span>
          {isFiltering
            ? `${filtered.length} / ${totalCount}`
            : `${totalCount}개`}
        </span>
        {isFiltering && (
          <button type="button" onClick={resetFilters}>
            초기화
          </button>
        )}
      </div>
      {/* ── 검색 + 정렬 ── */}
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="placeholder:text-md max-w-lg"
          placeholder="기술 이름 검색"
        />
        <Select
          value={sortKey}
          onValueChange={(e) => setSortKey(e as SortValue)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* ── 테이블 ── */}
      <div className={cn(isPending && 'opacity-50', 'sm:min-h-200')}>
        <MoveList moves={filtered} />
      </div>
    </div>
  );
}
