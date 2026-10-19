import { cn } from '@/_shared/lib/cn';

// 이름 표기 언어 (검색은 이미 세 언어 모두 찾는다)
const NAME_LANGUAGES = [
  { value: 'ko', label: '한' },
  { value: 'en', label: 'EN' },
  { value: 'ja', label: '日' },
] as const;

interface ResultsHeaderProps {
  totalCount: number;
}

/**
 * 목록 머리 줄: 개수 + 이름 표기 언어 [한 | EN | 日]
 * 정렬은 모두 테이블 머리글에서 하고, 이 줄은 표시 설정만 둔다.
 * TODO: 언어 전환은 레이아웃 확인용으로 배치만 했다 (선택·이름 바꾸기 미구현, 지금은 늘 '한')
 */
export default function ResultsHeader({ totalCount }: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p aria-live="polite" className="text-sm font-medium text-foreground/70">
        전체 {totalCount}개
      </p>
      <div className="flex items-center gap-2">
        <span
          id="name-language-label"
          className="text-xs font-medium text-foreground/70"
        >
          이름
        </span>
        <div
          role="group"
          aria-labelledby="name-language-label"
          className="flex rounded-full bg-muted p-0.5"
        >
          {NAME_LANGUAGES.map(({ value, label }) => {
            const isActive = value === 'ko';

            return (
              <button
                key={value}
                type="button"
                aria-pressed={isActive}
                className={cn(
                  'h-7 min-w-9 rounded-full px-2 text-xs font-medium outline-none',
                  'focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-foreground/70 [@media(hover:hover)]:hover:text-foreground',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
