'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { Pagination } from '@/shared/ui/pagination';

import AbilityPreview from './ability-preview';
import AbilityRow from './ability-row';
import useAbilityListV4 from './useAbilityListV4';

interface AbilityListV4Props {
  abilities: Ability[];
}

const LISTBOX_ID = 'ability-list-v4';

/**
 * 마스터–디테일 스플릿 목록.
 *
 * 왼쪽은 한 줄짜리 조밀한 행 목록(listbox), 오른쪽은 선택된 특성의 sticky 요약 패널이다.
 * lg 미만에서는 패널이 선택된 행 아래로 내려와 인라인 확장처럼 보인다.
 * 행을 클릭해도 이동하지 않고 미리보기만 바뀐다. 이동은 패널의 링크가 맡는다.
 */
export default function AbilityListV4({ abilities }: AbilityListV4Props) {
  const router = useRouter();

  const {
    filteredAbilities,
    pagedAbilities,
    currentPage,
    totalPages,
    goToPage,
    selectedIndex,
    setSelectedIndex,
    selectedAbility,
    getDisplayNumber,
  } = useAbilityListV4(abilities);

  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusRow = (index: number) => {
    setSelectedIndex(index);
    rowRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = pagedAbilities.length - 1;

    if (lastIndex < 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusRow(Math.min(selectedIndex + 1, lastIndex));
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusRow(Math.max(selectedIndex - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        focusRow(0);
        break;
      case 'End':
        event.preventDefault();
        focusRow(lastIndex);
        break;
      case 'Enter':
        // 목록에서 바로 상세로 이동하는 단축 동작.
        event.preventDefault();
        if (selectedAbility) {
          router.push(`/ability/${selectedAbility.identifier}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between text-sm text-foreground/70">
        <span aria-live="polite">{filteredAbilities.length}개의 특성</span>
        {filteredAbilities.length > 0 && (
          <span className="tabular-nums">
            {currentPage} / {totalPages} 페이지
          </span>
        )}
      </div>

      {filteredAbilities.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
          <div className="flex flex-col gap-6">
            {/* 포커스 링이 잘리지 않도록 px-3으로 bleed 여백을 확보한다. */}
            <div
              role="listbox"
              aria-label="특성 목록"
              onKeyDown={handleKeyDown}
              className="flex flex-col px-3"
            >
              {pagedAbilities.map((ability, index) => (
                <AbilityRow
                  key={ability.identifier}
                  id={`${LISTBOX_ID}-option-${index}`}
                  ref={(node) => {
                    rowRefs.current[index] = node;
                  }}
                  ability={ability}
                  displayNumber={getDisplayNumber(index)}
                  selected={index === selectedIndex}
                  onSelect={() => setSelectedIndex(index)}
                />
              ))}
            </div>

            {selectedAbility && (
              <AbilityPreview
                ability={selectedAbility}
                displayNumber={getDisplayNumber(selectedIndex)}
                className="lg:hidden"
              />
            )}
          </div>

          {selectedAbility && (
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <AbilityPreview
                  ability={selectedAbility}
                  displayNumber={getDisplayNumber(selectedIndex)}
                />
              </div>
            </aside>
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}
