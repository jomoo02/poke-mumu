'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/shared/lib/cn';

interface TocItem {
  id: string;
  label: string;
}

export default function Toc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const intersectionRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setActiveId(null);

    const main = document.querySelector('main');
    if (!main) return;

    const sync = () => {
      const headings = Array.from(
        main.querySelectorAll<HTMLHeadingElement>('h2[id]'),
      ).filter((h) => h.offsetParent !== null);

      setItems(
        headings.map((h) => ({
          id: h.id,
          label: h.textContent?.trim() ?? '',
        })),
      );

      intersectionRef.current?.disconnect();

      intersectionRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
      );

      for (const heading of headings) {
        intersectionRef.current.observe(heading);
      }
    };

    sync();

    let timer: ReturnType<typeof setTimeout>;
    const mutation = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(sync, 100);
    });
    mutation.observe(main, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      mutation.disconnect();
      intersectionRef.current?.disconnect();
    };
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="목차">
      <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-3 px-2">
        목차
      </p>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              className={cn(
                'block px-2 py-1.5 text-sm rounded-md transition-all duration-150',
                activeId === item.id
                  ? 'text-foreground font-medium bg-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
