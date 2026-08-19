import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { POKE_LIST_MODE, DEFAULT_MODE, type PokeListMode } from '../../model';

export default function useModeTab() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const mode: PokeListMode =
    params.get('mode') === POKE_LIST_MODE.list
      ? POKE_LIST_MODE.list
      : POKE_LIST_MODE.grid;

  const setMode = (next: PokeListMode) => {
    const newParmas = new URLSearchParams(params);
    if (next === DEFAULT_MODE) {
      newParmas.delete('mode');
    } else {
      newParmas.set('mode', next);
    }
    router.replace(`${pathname}?${newParmas.toString()}`, { scroll: false });
  };

  return {
    mode,
    setMode,
  };
}
