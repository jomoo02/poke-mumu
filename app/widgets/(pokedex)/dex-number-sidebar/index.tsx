import { getSurroundingPokes } from './api';
import { NavItem, MobileNavItem } from './ui/nav-item';

interface PokedexDexNumberSidebarProps {
  dexNumber: Promise<{ dexNumber: number | string }>;
}

export default async function PokedexDexNumberSidebar({
  dexNumber,
}: PokedexDexNumberSidebarProps) {
  const { dexNumber: targetDexNumber } = await dexNumber;
  const data = await getSurroundingPokes(targetDexNumber);

  if (!data) {
    return null;
  }
  const { pokes, prev, next } = data;

  return (
    <>
      <div className="hidden lg:block w-64 max-h-[calc(100svh-8rem)] sticky top-32 overflow-auto bg-sidebar">
        <div className="px-6">
          <ul className="flex flex-col gap-0.5 list-none">
            {pokes.map((poke) => (
              <NavItem
                key={poke.id}
                poke={poke}
                targetDexNumber={targetDexNumber}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:hidden flex justify-between px-4 sm:px-6">
        <div>{prev && <MobileNavItem poke={prev} direction="prev" />}</div>
        <div>{next && <MobileNavItem poke={next} direction="next" />}</div>
      </div>
    </>
  );
}
