import { getNationalPokedex } from './api';
import NationalDex from './ui/national-pokedex';

export default async function PokedexAllPageUI() {
  const nationPokedex = await getNationalPokedex({});
  return (
    <div>
      <NationalDex pokes={nationPokedex} />
    </div>
  );
}
