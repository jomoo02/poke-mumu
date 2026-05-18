'use client';

import { useEffect, useState } from 'react';

import { Type } from '@/app/entities/type/model';

import { type SearchPoke } from '.';

const KEY = 'LOCAL_POKE';

const isType = (v: unknown): v is Type => {
  if (v === null) {
    return true;
  }

  if (typeof v !== 'object') {
    return false;
  }

  const o = v as Record<string, unknown>;

  return typeof o.identifier === 'string' && typeof o.nameKo === 'string';
};

const isSearchPoke = (v: unknown): v is SearchPoke => {
  if (!v || typeof v !== 'object') return false;

  const o = v as Record<string, unknown>;

  return (
    typeof o.dexNumber === 'number' &&
    typeof o.pokeKey === 'string' &&
    typeof o.nameKo === 'string' &&
    isType(o.type1) &&
    isType(o.type2)
  );
};

const isSearchPokeArray = (v: unknown): v is SearchPoke[] =>
  Array.isArray(v) && v.every(isSearchPoke);

export default function useLocalStoragePoke(open: boolean) {
  const loadLocalPokeList = () => {
    if (typeof window === 'undefined') return [];

    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);

      if (!isSearchPokeArray(parsed)) {
        localStorage.removeItem(KEY); // ← 선택
        return [];
      }

      return parsed;
    } catch {
      // console.log('catch');
      localStorage.removeItem(KEY);
      return [];
    }
  };

  const [localPokeList, setLocalPokeList] =
    useState<SearchPoke[]>(loadLocalPokeList());

  const addPokeToLocalPokeList = (poke: SearchPoke) => {
    const filteredLocalPokeList = loadLocalPokeList().filter(
      ({ pokeKey }) => pokeKey !== poke.pokeKey,
    );

    const updatedPokeList = [{ ...poke }, ...filteredLocalPokeList.slice(0, 5)];
    console.log(updatedPokeList);
    window.localStorage.setItem(KEY, JSON.stringify(updatedPokeList));
    // setLocalPokeList(updatedPokeList);
  };
  useEffect(() => {
    if (open) {
      setLocalPokeList(loadLocalPokeList());
    }
  }, [open]);
  return {
    localPokeList,
    addPokeToLocalPokeList,
  };
}
