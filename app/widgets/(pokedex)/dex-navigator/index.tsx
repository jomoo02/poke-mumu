import { getSurroundingPokes } from './api';
import NavButton from './ui/nav-button';

interface DexNavigatorProps {
  dexNumber: Promise<{ dexNumber: string }>;
}

export default async function DexNavigator({ dexNumber }: DexNavigatorProps) {
  const { dexNumber: targetDexNumber } = await dexNumber;

  const pokes = await getSurroundingPokes(targetDexNumber);

  if (!pokes) {
    return null;
  }

  const { prev, next } = pokes;

  return (
    <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex justify-between py-4 overflow-hidden">
      <div className="flex">
        {prev && <NavButton {...prev} direction="prev" />}
      </div>
      <div className="flex flex-1 justify-end">
        {next && <NavButton {...next} direction="next" />}
      </div>
    </nav>
  );
}
