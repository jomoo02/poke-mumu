'use client';

import { useEffect, useState } from 'react';
import Link, { useLinkStatus } from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { LoaderCircleIcon, MenuIcon, XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { navItems } from './nav-items';

// 헤더의 데스크톱 메뉴가 나타나는 lg(1024px)
const DESKTOP_QUERY = '(min-width: 64rem)';

// lg 미만에서 헤더 아래를 꽉 채우는 메뉴. 열려 있는 동안 페이지 스크롤은 잠기고 메뉴 안에서만 스크롤된다
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // 이동이 끝나 경로가 바뀐 뒤에 닫는다. 클릭 즉시 닫으면 새 페이지가 그려지기 전까지 이전 페이지가 비친다
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // 열린 채로 lg 이상이 되면 햄버거 버튼은 사라지고 스크롤 잠금만 남으므로 닫는다
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        data-slot="mobile-nav-trigger"
        render={
          <Button
            variant="ghost"
            className="size-10 rounded-xl lg:hidden"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          />
        }
      >
        {open ? (
          <XIcon className="size-5" />
        ) : (
          <MenuIcon className="size-5" />
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup
          className={cn(
            'fixed inset-x-0 bottom-0 top-(--header-height) z-40 overflow-y-auto overscroll-contain bg-background lg:hidden',
            'transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0',
          )}
        >
          <Dialog.Title className="sr-only">메뉴</Dialog.Title>
          <nav className="flex flex-col px-2 pt-2 pb-8 sm:px-4">
            {navItems.map((item) => {
              const isActive = pathname?.startsWith(item.href) ?? false;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  // 지금 경로와 같은 링크는 경로가 바뀌지 않아 위에서 닫히지 않으니 클릭으로 닫는다
                  onClick={() => {
                    if (pathname === item.href) setOpen(false);
                  }}
                  className={cn(
                    'flex h-12 items-center justify-between rounded-xl px-3 text-lg font-medium',
                    'active:bg-accent outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    isActive && 'font-bold text-primary-text',
                  )}
                >
                  {item.label}
                  <LinkPendingIndicator />
                </Link>
              );
            })}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// 메뉴가 열린 채로 이동을 기다리는 동안 누른 링크에 표시한다 (useLinkStatus는 Link 안에서만 동작)
function LinkPendingIndicator() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <LoaderCircleIcon
      aria-label="이동 중"
      className="size-5 animate-spin text-muted-foreground"
    />
  );
}
