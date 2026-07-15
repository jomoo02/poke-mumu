'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LayoutGridIcon, ListIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { PokeLinkDesktop, PokeLinkMobile } from '@/features/poke-link/ui';

import type { RegionalPoke } from '../model/poke';

type ViewMode = 'grid' | 'list';

interface PokedexGameVersionGroupRegionClientProps {
  pokes: RegionalPoke[];
}

export default function PokedexGameVersionGroupRegionClient({
  pokes,
}: PokedexGameVersionGroupRegionClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const view: ViewMode = searchParams.get('view') === 'list' ? 'list' : 'grid';

  const setView = (next: ViewMode) => {
    const params = new URLSearchParams(searchParams);

    // 기본값(grid)은 URL에 보관하지 않고, list일 때만 보관한다.
    if (next === 'grid') {
      params.delete('view');
    } else {
      params.set('view', next);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="grid gap-6">
      {/* 탭은 sm 이상에서만 렌더링된다. */}
      <div className="hidden sm:flex justify-end">
        <div className="p-1 bg-muted rounded-2xl gap-1 flex">
          <ViewTabButton
            active={view === 'grid'}
            onClick={() => setView('grid')}
            label="그리드 보기"
          >
            <LayoutGridIcon className="size-4.5" />
          </ViewTabButton>
          <ViewTabButton
            active={view === 'list'}
            onClick={() => setView('list')}
            label="리스트 보기"
          >
            <ListIcon className="size-4.5" />
          </ViewTabButton>
        </div>
      </div>

      <div
        className={cn(
          'grid gap-4',
          view === 'list'
            ? 'grid-cols-3 sm:gap-6'
            : 'sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
        )}
      >
        {pokes.map((poke) => (
          <Item key={poke.pokeKey} poke={poke} view={view} />
        ))}
      </div>
    </div>
  );
}

interface ItemProps {
  poke: RegionalPoke;
  view: ViewMode;
}

function Item({ poke, view }: ItemProps) {
  // sm 이하에서는 paramState와 상관없이 반드시 PokeLinkMobile을 렌더링한다.
  // sm 이상에서는 grid면 PokeLinkDesktop, list면 PokeLinkMobile을 렌더링한다.
  if (view === 'list') {
    return <PokeLinkMobile poke={poke} formatLength={3} showForm={false} />;
  }

  return (
    <>
      <PokeLinkMobile
        poke={poke}
        formatLength={3}
        showForm={false}
        className="sm:hidden"
      />
      <PokeLinkDesktop
        poke={poke}
        formatLength={3}
        showForm={false}
        className="hidden sm:flex"
      />
    </>
  );
}

interface ViewTabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}

function ViewTabButton({
  active,
  onClick,
  label,
  children,
}: ViewTabButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        active
          ? 'bg-background shadow dark:bg-input/70'
          : 'text-foreground/50 hover:text-foreground',
        'size-9 inline-flex items-center justify-center rounded-xl border border-transparent',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none focus-visible:border-ring',
      )}
    >
      {children}
    </button>
  );
}
