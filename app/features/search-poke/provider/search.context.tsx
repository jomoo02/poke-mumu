import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useDeferredValue,
} from 'react';

import useSearch from '../model/useSearch';
import useInput from '../model/useInput';
import { type SearchPoke } from '../model';
import { checkEmptyText } from '../lib';
import useKeyDown from '../model/useKeyDown';
import useActiveScroll from '../model/useActiveScroll';
import useOpen from '../model/useOpen';
import useLocalStoragePoke from '../model/useLocal';
import { useRouter } from 'next/navigation';

interface SearchContextValue {
  searchResult: SearchPoke[];
  inputRef: RefObject<HTMLInputElement | null>;
  inputValue: string;
  handleInputValueChange: Dispatch<SetStateAction<string>>;

  isLoading: boolean;
  isInputEmpty: boolean;
  closeSearch: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  activeIndex: number;
  onKeyDown: (e: React.KeyboardEvent) => void;
  registerItem: (index: number) => (el: HTMLElement | null) => void;
  onMouseMoveItem: (index: number) => void;
  listContainerRef: RefObject<HTMLDivElement | null>;
  selectPoke: (poke: SearchPoke) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearchContext Error');
  }
  return context;
}

function SearchProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen, closeSearch } = useOpen();
  const { inputRef, setInputValue, inputValue } = useInput(isOpen);
  const { data, error, isLoading } = useSearch(inputValue);
  const { localPokeList, addPokeToLocalPokeList } = useLocalStoragePoke();
  const isInputEmpty = checkEmptyText(inputValue);

  const searchResult = useMemo(
    () => (isInputEmpty ? localPokeList : data || []),
    [isInputEmpty, data, localPokeList],
  );

  const deferredSearchResult = useDeferredValue(searchResult);

  const [activeIndex, setActiveIndex] = useState<number>(
    searchResult.length > 0 ? 0 : -1,
  );

  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const registerItem = useCallback((index: number) => {
    return (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    };
  }, []);

  const router = useRouter();

  const selectPoke = useCallback(
    (poke: SearchPoke) => {
      addPokeToLocalPokeList(poke);
      router.push(`/pokedex/${poke.dexNumber}/${poke.pokeKey}`);
    },
    [addPokeToLocalPokeList, router],
  );

  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const lastInputRef = useRef<'keyboard' | 'mouse'>('keyboard');

  useActiveScroll({ activeIndex, listContainerRef, itemRefs, lastInputRef });
  useEffect(() => {
    if (!isOpen) return;

    setActiveIndex(-1);
    itemRefs.current = [];
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (searchResult.length > 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }

    itemRefs.current = [];
  }, [searchResult, isOpen]);

  const onMouseMoveItem = useCallback((index: number) => {
    if (lastInputRef.current === 'keyboard') {
      lastInputRef.current = 'mouse';
    }
    setActiveIndex(index);
  }, []);

  const { onKeyDown } = useKeyDown({
    activeIndex,
    setActiveIndex,
    lastInputRef,
    selectPoke,
    content: searchResult,
  });

  const value = useMemo(
    () => ({
      searchResult: deferredSearchResult,
      closeSearch,
      inputRef,
      inputValue,
      handleInputValueChange: setInputValue,
      isInputEmpty,
      isLoading,
      isOpen,
      setIsOpen,
      onMouseMoveItem,
      onKeyDown,
      listContainerRef,
      registerItem,
      activeIndex,
      selectPoke,
    }),
    [
      deferredSearchResult,
      closeSearch,
      inputRef,
      inputValue,
      setInputValue,
      isInputEmpty,
      isLoading,
      isOpen,
      setIsOpen,
      onMouseMoveItem,
      onKeyDown,
      listContainerRef,
      registerItem,
      activeIndex,
      selectPoke,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export { SearchProvider, useSearchContext };
