'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import type { AdminPokeResult } from '../types';
import { searchPokemon } from '../actions';
import { Input } from '@/app/shared/ui/input';
import { Button } from '@/app/shared/ui/button';

type Props = {
  selected: AdminPokeResult | null;
  onSelect: (poke: AdminPokeResult) => void;
  onClear: () => void;
};

export default function PokeSelector({ selected, onSelect, onClear }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AdminPokeResult[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // 디바운스 검색
  useEffect(() => {
    if (!query || query.length < 1) {
      setResults([]);
      setShowDrop(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const data = await searchPokemon(query);
        setResults(data);
        setShowDrop(true);
      } catch {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // 외부 클릭 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShowDrop(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(poke: AdminPokeResult) {
    onSelect(poke);
    setQuery('');
    setShowDrop(false);
  }

  if (selected) {
    return (
      <div className="flex items-center gap-2 rounded-4xl border border-border bg-card px-4 h-12">
        {selected.sprite && (
          <Image
            alt={selected.sprite}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            src={`https://raw.githubusercontent.com/jomoo02/poke_sprites/refs/heads/main/home/${selected.sprite}.png`}
          />
        )}
        <span className="text-sm font-medium">{selected.nameKo}</span>
        <span className="text-sm text-muted-foreground">{selected.nameEn}</span>
        <span className="text-sm text-muted-foreground">
          {selected.pokeKey}
        </span>
        {selected.formNameKo && (
          <span className="text-sm text-muted-foreground">
            ({selected.formNameKo})
          </span>
        )}
        <button
          className="ml-auto text-sm text-muted-foreground hover:text-foreground"
          onClick={onClear}
        >
          변경
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropRef}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="poke_key 또는 이름 검색"
        className="w-full text-sm h-12"
      />

      {showDrop && results.length > 0 && (
        <div className="absolute top-full z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-4xl border border-border bg-card shadow-lg p-2">
          {results.map((p) => (
            <Button
              key={p.pokeKey}
              variant={'ghost'}
              className="flex w-full justify-start items-center gap-4 px-4 h-14"
              onClick={() => handleSelect(p)}
            >
              {p.sprite && (
                <Image
                  alt={p.sprite}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  src={`https://raw.githubusercontent.com/jomoo02/poke_sprites/refs/heads/main/home/${p.sprite}.png`}
                />
              )}
              <span>
                #{p.dexNumber} {p.nameKo}
              </span>
              <span className="text-muted-foreground">{p.nameEn}</span>
              <span className="text-muted-foreground">{p.pokeKey}</span>
              {p.formNameKo && (
                <span className="text-muted-foreground">({p.formNameKo})</span>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
