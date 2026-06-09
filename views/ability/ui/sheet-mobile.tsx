import { Dialog as SheetPrimitive } from 'radix-ui';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';

import { useIsMobile } from '@/app/shared/model/use-mobile';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/shared/ui/sheet';

interface SheetMobileProps {
  children: React.ReactNode;
}

export default function SheetMobile({ children }: SheetMobileProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="size-10 active:bg-muted" variant={'outline'}>
              <SlidersHorizontalIcon className="size-4.5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            showCloseButton={false}
            className="gap-y-0 data-[side=right]:sm:max-w-none data-[side=right]:md:max-w-sm data-[side=right]:w-full px-5 flex lg:hidden"
          >
            <div className="h-14 flex items-center justify-end mb-3">
              <SheetPrimitive.Close data-slot="sheet-close" asChild>
                <Button variant="ghost" className="size-11">
                  <XIcon className="size-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetPrimitive.Close>
            </div>
            <SheetHeader className="mb-0 p-0">
              <SheetTitle className="sr-only">필터</SheetTitle>
              <SheetDescription className="sr-only">
                filter ability
              </SheetDescription>
            </SheetHeader>
            {children}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
