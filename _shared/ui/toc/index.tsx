'use client';

import * as React from 'react';

import { cn } from '@/_shared/lib/cn';

import { useActiveSection } from './use-active-section';

interface TocItem {
  id: string;
  label: string;
  depth?: 1 | 2;
}

interface TocProps extends Omit<React.ComponentProps<'nav'>, 'children'> {
  items: TocItem[];
  title?: string;
}

function Toc({ items, title = '목차', className, ...props }: TocProps) {
  const ids = React.useMemo(() => items.map((item) => item.id), [items]);
  const { activeId, scrollToSection } = useActiveSection(ids);

  if (items.length === 0) {
    return null;
  }

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    // 새 탭 열기 등 수정키 클릭은 브라우저 기본 동작에 맡긴다
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (scrollToSection(id)) {
      event.preventDefault();
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      aria-label={title}
      data-slot="toc"
      className={cn(
        'sticky top-[calc(var(--header-height))]',
        'max-h-[calc(100svh-var(--header-height)-3rem)] overflow-y-auto flex flex-col gap-2 p-5',
        className,
      )}
      {...props}
    >
      <p className="text-sm font-medium px-3 h-6">{title}</p>
      <ul className="flex flex-col text-sm">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => handleClick(event, item.id)}
                className={cn(
                  '-ml-px block border-transparent py-1.5 px-3 break-keep',
                  'text-foreground/70 transition-colors outline-none',

                  'focus-visible:ring-2 rounded-sm focus-visible:ring-inset focus-visible:ring-ring/50',
                  '[@media(hover:hover)]:hover:text-foreground',
                  item.depth === 2 && 'pl-6',
                  isActive && 'border-foreground font-medium text-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { Toc, type TocItem };
