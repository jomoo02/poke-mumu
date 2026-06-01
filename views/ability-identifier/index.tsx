import { DotIcon } from 'lucide-react';

import { getAbility, getPokes } from './api';
import PokeList from './ui/poke-list';

interface AbilityIdentifierViewProps {
  identifier: string;
}

export default async function AbilityIdentifierView({
  identifier,
}: AbilityIdentifierViewProps) {
  const ability = await getAbility(identifier);

  if (!ability) {
    return null;
  }

  const pokes = await getPokes(ability.id);
  return (
    <div className="max-w-7xl mx-auto 2xl:max-w-350 py-12 w-full min-h-svh flex flex-col gap-6 px-4 sm:px-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight ">{ability.nameKo}</h1>
        <div className="pt-3 flex items-center text-lg">
          <span>{ability.nameEn}</span>
          <DotIcon className="size-4.5" />
          <span>{ability.nameJa}</span>
        </div>
        <p className="pt-6 md:max-w-[80%] text-pretty break-keep">
          {ability.flavorText}
        </p>
      </div>
      {ability.gen && (
        <div className="">
          <h2 className="text-2xl font-bold tracking-wide mt-10">첫 등장</h2>
          <div className="pt-6">{ability.gen}세대</div>
        </div>
      )}

      <PokeList pokes={pokes} abilityName={ability.nameKo} />
    </div>
  );
}
