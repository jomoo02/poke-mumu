import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

interface FilterAndSortDrawerTabsProps<T> {
  activeTabId: T;
  setActiveTabId: (tab: T) => void;
  tabs: {
    id: T;
    label: string;
  }[];
}

export default function FilterAndSortDrawerTabs<T>({
  activeTabId,
  setActiveTabId,
  tabs,
}: FilterAndSortDrawerTabsProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-1 px-6 pt-2">
      {tabs.map((tab) => (
        <Button
          key={tab.label}
          variant={'ghost'}
          data-state={activeTabId === tab.id ? 'active' : ''}
          onClick={() => setActiveTabId(tab.id)}
          className={cn(
            'hover:bg-transparent relative text-foreground/60 text-base data-active:text-foreground hover:text-foreground transition-colors h-11',
            'after:bg-foreground after:opacity-0 after:-bottom-1 after:inset-x-0 after:absolute after:h-0.5 after:w-full after:transition-opacity',
            'data-active:after:opacity-80',
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
