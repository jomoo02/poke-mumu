'use client';

import {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import { X, ListFilterIcon } from 'lucide-react';
import { Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

const MAX_SELECTION = 2;

/* ── Context ── */

interface TypeFilterContextValue {
  filteredAllTypes: Type[];
  selected: string[];
  selectedTypes: Type[];
  isMaxed: boolean;
  hasSelection: boolean;
  open: boolean;
  toggleOpen: () => void;
  handleToggle: (identifier: string) => void;
  handleRemove: (identifier: string) => void;
  handleReset: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  height: number;
}

const TypeFilterContext = createContext<TypeFilterContextValue | null>(null);

function useTypeFilterContext() {
  const ctx = useContext(TypeFilterContext);
  if (!ctx) throw new Error('TypeFilter 컴포넌트 안에서 사용해주세요');
  return ctx;
}

/* ── Root ── */

interface TypeFilterProps {
  allTypes: Type[];
  selected: string[];
  onChange: (types: string[]) => void;
  children: ReactNode;
}

function TypeFilterRoot({
  allTypes,
  selected,
  onChange,
  children,
}: TypeFilterProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const filteredAllTypes = allTypes.filter(
    ({ identifier }) => identifier !== 'unknown',
  );

  const selectedTypes = filteredAllTypes.filter((t) =>
    selected.includes(t.identifier),
  );

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (identifier: string) => {
    if (selected.includes(identifier)) {
      onChange(selected.filter((t) => t !== identifier));
    } else if (selected.length < MAX_SELECTION) {
      onChange([...selected, identifier]);
    }
  };

  const handleRemove = (identifier: string) => {
    onChange(selected.filter((t) => t !== identifier));
  };

  const handleReset = () => onChange([]);

  return (
    <TypeFilterContext.Provider
      value={{
        filteredAllTypes,
        selected,
        selectedTypes,
        isMaxed: selected.length >= MAX_SELECTION,
        hasSelection: selected.length > 0,
        open,
        toggleOpen: () => setOpen((v) => !v),
        handleToggle,
        handleRemove,
        handleReset,
        contentRef,
        height,
      }}
    >
      {children}
    </TypeFilterContext.Provider>
  );
}

/* ── Trigger ── */

function Trigger() {
  const {
    open,
    toggleOpen,
    selectedTypes,
    hasSelection,
    handleRemove,
    handleReset,
  } = useTypeFilterContext();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={toggleOpen} size={'lg'}>
        <ListFilterIcon className="size-4" />
        <span>타입</span>
      </Button>

      {selectedTypes.map(({ identifier, name }) => (
        <button
          key={identifier}
          type="button"
          onClick={() => handleRemove(identifier)}
          className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: `var(--color-${identifier})` }}
        >
          {name}
          <X className="size-3" />
        </button>
      ))}

      {hasSelection && (
        <button
          type="button"
          onClick={handleReset}
          className="shrink-0 text-sm text-muted-foreground hover:text-foreground"
        >
          초기화
        </button>
      )}
    </div>
  );
}

/* ── Panel ── */

function Panel({ className }: { className?: string }) {
  const {
    open,
    height,
    contentRef,
    filteredAllTypes,
    selected,
    isMaxed,
    handleToggle,
  } = useTypeFilterContext();

  return (
    <div
      className={cn(
        'overflow-hidden transition-[height] duration-200 ease-out',
        className,
      )}
      style={{ height: open ? height : 0 }}
    >
      <div ref={contentRef}>
        <div className="flex flex-wrap gap-2 pt-1">
          {filteredAllTypes.map(({ identifier, name }) => {
            const isSelected = selected.includes(identifier);
            const isDisabled = !isSelected && isMaxed;

            return (
              <Button
                key={identifier}
                variant="outline"
                disabled={isDisabled}
                onClick={() => handleToggle(identifier)}
                className={cn(
                  'px-3 transition-none',
                  isDisabled && 'cursor-not-allowed opacity-30',
                  isSelected && 'font-semibold',
                )}
                style={
                  isSelected
                    ? {
                        backgroundColor: `var(--color-${identifier})`,
                        borderColor: `var(--color-border-${identifier})`,
                        color: '#fff',
                      }
                    : {}
                }
              >
                {name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Export ── */

const TypeFilter = Object.assign(TypeFilterRoot, {
  Trigger,
  Panel,
});

export default TypeFilter;
