import { cn } from '@/app/shared/lib/cn';

import { getSpeciesPokes } from './api';
import DesktopNav from './ui/desktop-nav';
import MobileNav from './ui/mobile-nav';

interface PokedexDetailLayoutUIProps {
  children: React.ReactNode;
}

export default async function PokedexDetailLayoutUI({
  children,
}: PokedexDetailLayoutUIProps) {
  const pokes = await getSpeciesPokes();

  return (
    <div className="w-full flex flex-col lg:flex-row ">
      {/* <div className="sticky top-14 z-10 h-[calc(100vh-56px)] hidden lg:block w-64  py-px border-r">
        {pokes && <DesktopNav pokes={pokes} />}
      </div> */}
      <div className="lg:hidden pt-10 px-4 md:px-6 max-w-4xl mx-auto w-full">
        {pokes && <MobileNav pokes={pokes} />}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
