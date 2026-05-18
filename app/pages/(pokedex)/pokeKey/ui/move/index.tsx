import {
  getDefaultVgForPoke,
  getAvailableVgsForPoke,
  getPokeMovesByVg,
} from '../../api/move';
import {
  Section,
  SectionBorder,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from '../section';
import Container from './container';

interface MovesSectionProps {
  pokeKey: string;
}
export default async function MovesSection({ pokeKey }: MovesSectionProps) {
  const [defaultVg, availableVgs] = await Promise.all([
    getDefaultVgForPoke(pokeKey),
    getAvailableVgsForPoke(pokeKey),
  ]);

  const initialMoves = await getPokeMovesByVg(pokeKey, defaultVg);

  return (
    <Section>
      <SectionBorder />
      <SectionTitle>기술</SectionTitle>
      <SectionDescription>배울 수 있는 기술 목록</SectionDescription>
      <SectionContent className="flex flex-col gap-4">
        <Container
          pokeKey={pokeKey}
          defaultVg={defaultVg}
          availableVgs={availableVgs}
          initialMoves={initialMoves}
        />
      </SectionContent>
    </Section>
  );
}
