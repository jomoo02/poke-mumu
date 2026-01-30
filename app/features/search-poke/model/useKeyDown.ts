import { RefObject, SetStateAction, useCallback, useRef } from 'react';

import { SearchPoke } from '.';

export default function useKeyDown({
  content,
  activeIndex,
  setActiveIndex,
  lastInputRef,
  selectPoke,
}: {
  content: SearchPoke[];
  activeIndex: number;
  setActiveIndex: (value: SetStateAction<number>) => void;
  lastInputRef: RefObject<'keyboard' | 'mouse'>;
  selectPoke: (poke: SearchPoke) => void;
}) {
  const isKeyboardNav = useRef(false);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!content.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        lastInputRef.current = 'keyboard';
        isKeyboardNav.current = true;
        setActiveIndex((i) => Math.min(i + 1, content.length - 1));
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        lastInputRef.current = 'keyboard';
        isKeyboardNav.current = true;
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const idx = activeIndex;
        const poke = content[idx];

        if (!poke) {
          return;
        }

        // assumed route pattern; adjust if your search item uses other keys
        const dexNumber = poke.dexNumber;
        const species = poke.pokeKey;

        // guard
        if (typeof dexNumber === 'number' && typeof species === 'string') {
          selectPoke(poke);
        }
      }
    },
    [activeIndex, content, lastInputRef, selectPoke, setActiveIndex],
  );
  return {
    onKeyDown,
  };
}
