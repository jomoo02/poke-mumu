import { Poke } from '@/app/entities/poke/model';
import { PokeArtwork } from '@/app/entities/poke/ui';

interface MainImgProps {
  poke: Poke;
}

export default function MainImg({ poke }: MainImgProps) {
  return (
    <div className="h-full w-full max-w-100 max-h-100 relative mx-auto aspect-square">
      <PokeArtwork
        className="object-contain w-full h-full"
        poke={poke}
        priority
      />
    </div>
  );
}
