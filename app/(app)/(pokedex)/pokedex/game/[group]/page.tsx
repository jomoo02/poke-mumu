import PokedexGameGroupPageUI from '@/app/pages/(pokedex)/game-group';
import { getGameGroupAll } from '@/app/pages/(pokedex)/game-group/api';

export async function generateStaticParams() {
  const groups = await getGameGroupAll();

  return groups.map(({ group }) => ({
    group,
  }));
}

export default async function PokedexGameGroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;

  return <PokedexGameGroupPageUI group={group} />;
}
