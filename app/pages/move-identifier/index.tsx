import { notFound } from 'next/navigation';

import {
  getMoveByIdentifier,
  getVersionHistory,
  getPokemonsByMove,
  getMoveLearnMethod,
} from './api';
import Container from './ui/container';
import Move from './ui/move';
import LearnPokeList from './ui/learn-poke-list';
import History from './ui/history';
import MachineList from './ui/machine-list';

interface MoveIdentifierPageUIProps {
  identifier: string;
}

export default async function MoveIdentifierPageUI({
  identifier,
}: MoveIdentifierPageUIProps) {
  const move = await getMoveByIdentifier(identifier);

  if (!move) notFound();

  const [history, pokemons, learnMethods] = await Promise.all([
    getVersionHistory(move.id),
    getPokemonsByMove(move.id, move.versionGroupId ?? 21),
    getMoveLearnMethod(),
  ]);

  const description = history.at(-1)?.description || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-16 w-full min-h-svh flex flex-col gap-6">
      <Move move={move} description={description} />
      <History history={history} />
      <MachineList history={history} />

      <LearnPokeList pokes={pokemons} learnMethods={learnMethods} />
    </div>
  );
}
