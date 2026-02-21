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
    <div className="flex justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div>{prev && <MobileNavItem poke={prev} direction="prev" />}</div>
      <div>{next && <MobileNavItem poke={next} direction="next" />}</div>
    </div>
  );
}
