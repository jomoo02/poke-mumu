import React from 'react';
import type { PokeType } from '@/app/data/poke-type';
import Header from '../components/header';
import DefenseCompatibility from './components/defense-compatibility';

interface PokeDefenseCompatibilityProps {
  types: PokeType[];
}

export default function PokeDefenseCompatibility({
  types,
}: PokeDefenseCompatibilityProps) {
  const mainType = types[0];

  return (
    <div>
      <Header
        type={mainType}
        text="방어 상성"
      />
      <DefenseCompatibility pokeTypes={types} />
    </div>
  );
}
