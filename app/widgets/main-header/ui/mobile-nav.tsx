'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Dialog, VisuallyHidden } from 'radix-ui';
// import {  } from 'radix-ui';
// import * as Dialog from '@radix-ui/react-dialog';
// import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button } from '@/app/shared/ui/button';
import { MenuIcon, X } from 'lucide-react';
import NavLink from './nav-link';
import SearchPoke from '@/app/features/search-poke';
import ThemeToggle from './theme-toggle';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    // setOpen(false);
    router.push(href);
  };
  useLayoutEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-accent p-2 h-10 aspect-square rounded-lg flex items-center justify-center active:bg-accent border-0"
        >
          <MenuIcon className="size-5 text-muted-foreground" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay 없음 — 풀스크린이라 불필요 */}
        <Dialog.Overlay />
        <Dialog.Content className="fixed inset-0 z-50 bg-background outline-none">
          <VisuallyHidden.Root>
            <Dialog.Title>메뉴</Dialog.Title>
            <Dialog.Description>사이트 내비게이션</Dialog.Description>
          </VisuallyHidden.Root>

          {/* 자체 헤더 */}
          <header className="h-14 flex items-center justify-between px-4 ring-1 ring-border sm:px-6 xl:px-10">
            <Link
              href="/"
              onClick={() => handleNavigate('/')}
              className="flex items-center text-xl font-extrabold text-foreground"
            >
              포케무무
            </Link>
            <div className="flex items-center gap-1">
              <Suspense>
                <SearchPoke />
                <ThemeToggle />
              </Suspense>
              <Dialog.Close asChild>
                <Button variant="ghost" size={'icon-lg'} className="size-10">
                  <X className="size-5" />
                </Button>
              </Dialog.Close>
            </div>
          </header>

          {/* 메뉴 본문 */}
          <nav className="flex flex-col px-2 py-3 gap-3 overflow-y-auto h-[calc(100dvh-56px)]">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  // onClick={() => handleNavigate(item.href)}
                  className={[
                    'px-4 py-2 rounded-lg text-base font-medium transition-colors text-left',
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
