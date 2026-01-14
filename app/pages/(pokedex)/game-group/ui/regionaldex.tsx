import { RegionalPokeView } from '../model';
import RegionalPoke from './regional-poke';

interface RegionaldexProps {
  pokes: RegionalPokeView[];
}

export default function Regionaldex({ pokes }: RegionaldexProps) {
  const maxLength = `${Math.max(
    ...pokes.map(({ regionalDexNumber }) => regionalDexNumber),
  )}`.length;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto w-full p-6">
      {pokes.map((poke) => (
        <RegionalPoke
          key={poke.id}
          poke={poke}
          dexNumberMaxLength={maxLength}
        />
      ))}
    </div>
  );
}
