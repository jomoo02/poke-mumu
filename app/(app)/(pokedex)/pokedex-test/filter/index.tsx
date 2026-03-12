// /features/pokedex-filter/ui/PokedexFilter.tsx

'use client';

import { useState, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

import { type Type } from '@/app/entities/type/model';
import { type SortKey, type Direction } from '@/app/pages/(pokedex)/all/model';

// ── 상수 ─────────────────────────────────────────────────────────────────────

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'dexNumber', label: '#' },
  { key: 'name', label: '이름' },
  { key: 'total', label: '총합' },
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: '공격' },
  { key: 'defense', label: '방어' },
  { key: 'specialAttack', label: '특공' },
  { key: 'specialDefense', label: '특방' },
  { key: 'speed', label: '속도' },
];

// ── Props ─────────────────────────────────────────────────────────────────────

interface PokedexFilterProps {
  allTypes: Type[];
  inputValue: string;
  setInputValue: (value: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  sortKey: SortKey;
  setSortKey: (key: string) => void;
  direction: Direction;
}

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default function PokedexFilter({
  allTypes,
  inputValue,
  setInputValue,
  filterType,
  setFilterType,
  sortKey,
  setSortKey,
  direction,
}: PokedexFilterProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDirty =
    inputValue !== '' || filterType !== 'all' || sortKey !== 'dexNumber';

  const activeFilterCount =
    (filterType !== 'all' ? 1 : 0) + (sortKey !== 'dexNumber' ? 1 : 0);

  const resetAll = () => {
    setInputValue('');
    setFilterType('all');
    setSortKey('dexNumber');
  };

  // Drawer 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Sticky 헤더 ── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-2">
          {/* 검색바 */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="포켓몬 이름으로 검색..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                         placeholder:text-gray-400"
            />
            {inputValue && (
              <button
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="검색어 지우기"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 필터 버튼 */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={[
              'relative shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold transition-all',
              activeFilterCount > 0
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-800 hover:text-gray-900',
            ].join(' ')}
            aria-label="필터 열기"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>필터</span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white text-gray-900 text-xs font-bold leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Backdrop — 항상 DOM에 존재, CSS로 토글 ── */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={[
          'fixed inset-0 bg-black/40 z-20 transition-opacity duration-300',
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* ── Drawer — 항상 DOM에 존재, translate로 토글 ── */}
      <div
        className={[
          'fixed inset-x-0 bottom-0 z-30 bg-white rounded-t-2xl shadow-xl',
          'transition-transform duration-300 ease-out',
          'max-h-[80dvh] flex flex-col',
          drawerOpen ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
        aria-modal="true"
        role="dialog"
        aria-label="필터 및 정렬"
      >
        {/* 핸들 */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 shrink-0">
          <span className="text-base font-bold text-gray-900">
            필터 및 정렬
          </span>
          <div className="flex items-center gap-3">
            {isDirty && (
              <button
                onClick={resetAll}
                className="text-sm text-gray-400 hover:text-gray-800 transition-colors"
              >
                초기화
              </button>
            )}
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-400 hover:text-gray-800 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 shrink-0" />

        {/* 스크롤 가능한 콘텐츠 */}
        <div className="overflow-y-auto flex flex-col gap-5 px-5 py-4">
          {/* 타입 */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              타입
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setFilterType('all')}
                className={[
                  'px-3 py-0.5 rounded-full border text-sm font-semibold transition-all',
                  filterType === 'all'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-800 hover:text-gray-900',
                ].join(' ')}
              >
                전체
              </button>
              {allTypes.map((t) => {
                const selected = filterType === t.identifier;
                return (
                  <button
                    key={t.identifier}
                    onClick={() => setFilterType(t.identifier)}
                    className={[
                      'px-3 py-0.5 rounded-full border text-sm font-semibold transition-all',
                      selected
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-800 hover:text-gray-900',
                    ].join(' ')}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* 정렬 */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              정렬
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SORT_OPTIONS.map((opt) => {
                const active = sortKey === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setSortKey(opt.key)}
                    className={[
                      'px-3 py-1 rounded-lg border text-sm font-semibold transition-all',
                      active
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-800 hover:text-gray-900',
                    ].join(' ')}
                  >
                    {opt.label}
                    {active && (
                      <span className="ml-1 text-xs opacity-70">
                        {direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 하단 safe area 여백 */}
          <div className="pb-safe" />
        </div>

        {/* 적용 버튼 */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold
                       hover:bg-gray-700 transition-colors active:scale-[0.98]"
          >
            적용하기
          </button>
        </div>
      </div>
    </>
  );
}
