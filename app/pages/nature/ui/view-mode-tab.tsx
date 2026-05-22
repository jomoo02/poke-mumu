import { LayoutGridIcon, ListIcon } from 'lucide-react';

import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

import type { ViewMode } from '../model/useViewMode';

interface ViewModeTab {
  viewMode: ViewMode;
  chageViewMode: (mode: string) => void;
}

export default function ViewModeTab({ viewMode, chageViewMode }: ViewModeTab) {
  const handleClickGrid = () => {
    chageViewMode('grid');
  };
  const handleClickList = () => {
    chageViewMode('list');
  };

  return (
    <div className={cn('p-1 flex items-center gap-0.5 rounded-4xl bg-muted')}>
      <Button
        onClick={handleClickGrid}
        variant={'ghost'}
        className={cn(
          'h-8 rounded-2xl',
          viewMode === 'grid'
            ? 'bg-background text-foreground hover:bg-background dark:hover:bg-background'
            : 'text-muted-foreground hover:text-foreground',
        )}
        aria-label="그리드 보기"
      >
        <LayoutGridIcon className="size-4.5" />
      </Button>
      <Button
        onClick={handleClickList}
        variant={'ghost'}
        className={cn(
          'h-8 rounded-2xl',
          viewMode === 'list'
            ? 'bg-background text-foreground hover:bg-background  dark:hover:bg-background'
            : 'text-muted-foreground hover:text-foreground',
        )}
        aria-label="리스트 보기"
      >
        <ListIcon className="size-4.5" />
      </Button>
    </div>
  );
}
