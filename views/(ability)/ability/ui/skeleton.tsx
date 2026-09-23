import { Input } from '@/shared/ui/input';
import {
  PageLayoutContainer,
  PageLayoutSection,
} from '@/shared/ui/page-layout';
import { cn } from '@/shared/lib/cn';

/** '전체' + 3~9세대 */
const CHIP_COUNT = 8;
const SECTION_COUNT = 3;
const ENTRIES_PER_SECTION = 6;

/**
 * AbilityListV6(세대 타임라인) 모양의 Suspense fallback.
 * 칩 행(h-10) · 레일/세대 헤더(py-3 + 32/36px) · 항목(py-4 기준 최대 128px) 높이를
 * 실제 레이아웃과 맞춰 레이아웃 이동을 줄인다.
 */
export default function AbilityViewSkeleton() {
  return (
    <PageLayoutContainer>
      <PageLayoutSection className="mt-0 animate-pulse">
        <Input className="h-10.5" />
        <div className="flex flex-col gap-6">
          {/* 개수 텍스트 한 줄(text-sm = 20px) */}
          <div className="h-5 w-1" />

          {/* 세대 칩 행 */}
          <div className="flex gap-2 overflow-hidden md:flex-wrap">
            {Array.from({ length: CHIP_COUNT }, (_, i) => (
              <div
                key={i}
                className="h-10 w-20 shrink-0 rounded-full bg-muted/70"
              />
            ))}
          </div>

          <div className="flex flex-col">
            {Array.from({ length: SECTION_COUNT }, (_, sectionIndex) => {
              const isFirst = sectionIndex === 0;
              const isLast = sectionIndex === SECTION_COUNT - 1;

              return (
                <div
                  key={sectionIndex}
                  className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 md:gap-x-8"
                >
                  <div
                    className={cn(
                      'col-start-1 row-span-2 row-start-1 w-px justify-self-center bg-border',
                      isFirst && 'mt-7 md:mt-7.5',
                    )}
                  />

                  <div className="relative col-start-2 row-start-1 px-3 py-3">
                    <div className="absolute top-1/2 right-full mr-4 size-6 -translate-y-1/2 rounded-full bg-muted md:mr-8" />
                    <div className="h-8 w-28 rounded-lg bg-muted/70 md:h-9" />
                  </div>

                  <div
                    className={cn(
                      'col-start-2 row-start-2 grid grid-cols-1 gap-y-2 px-3',
                      'md:grid-cols-2 md:gap-x-8 xl:grid-cols-3',
                      !isLast && 'pb-12 md:pb-16',
                    )}
                  >
                    {Array.from({ length: ENTRIES_PER_SECTION }, (_, i) => (
                      <div key={i} className="h-32 rounded-2xl bg-muted/70" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}
