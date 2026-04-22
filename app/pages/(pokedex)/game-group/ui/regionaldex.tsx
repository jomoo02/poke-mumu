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
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
        {pokes.map((poke) => (
          <RegionalPoke
            key={poke.id}
            poke={poke}
            dexNumberMaxLength={maxLength}
          />
        ))}
      </div>
    </div>
  );
}
