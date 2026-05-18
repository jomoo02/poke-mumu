'use client';

import { LayoutGridIcon, ListIcon } from 'lucide-react';
import { useViewMode } from './view-mode.context';
import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

export function ViewModeToggle({ className }: { className?: string }) {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div
      className={cn(
        // 'flex items-center gap-0.5 rounded-lg border p-0.5 ',
        'p-1 flex items-center gap-0.5 rounded-4xl bg-muted',
        className,
      )}
    >
      <Button
        onClick={() => setViewMode('grid')}
        variant={'ghost'}
        className={cn(
          // 'rounded-md p-1.5 transition-colors',
          'h-8 rounded-2xl',
          viewMode === 'grid'
            ? 'bg-background text-foreground hover:bg-background'
            : 'text-muted-foreground hover:text-foreground',
        )}
        aria-label="그리드 보기"
      >
        <LayoutGridIcon className="size-4.5" />
      </Button>
      <Button
        onClick={() => setViewMode('list')}
        variant={'ghost'}
        className={cn(
          'h-8 rounded-2xl',
          viewMode === 'list'
            ? 'bg-background text-foreground hover:bg-background'
            : 'text-muted-foreground hover:text-foreground',
        )}
        aria-label="리스트 보기"
      >
        <ListIcon className="size-4.5" />
      </Button>
    </div>
  );
}
