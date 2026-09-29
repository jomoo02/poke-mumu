import { getObjectParticle } from '@/_shared/lib/ko';
import { PokeCardHorizontal } from '@/_entities/poke';

import type { AbilityPoke } from '../model/ability-poke';

interface PokeListProps {
  id: string;
  title: string;
  pokes: AbilityPoke[];
  name: string;
}

export default function PokeList({ id, title, pokes, name }: PokeListProps) {
  return (
    <div id={id} className="flex flex-col gap-4 mt-3">
      <h3 className="text-lg font-bold">
        {title} ({pokes.length})
      </h3>
      {pokes.length === 0 ? (
        <p className="text-foreground/70">
          {`${name}${getObjectParticle(name)} ${title}으로 가진 포켓몬이 없습니다.`}
        </p>
      ) : (
        <div className="@container">
          <div className="grid @min-[600px]:grid-cols-2 @min-[1000px]:grid-cols-3 gap-y-4 gap-x-8">
            {pokes.map((poke, idx) => (
              <div key={poke.pokeKey}>
                <PokeCardHorizontal poke={poke} />
              </div>
            ))}
          </div>
        </div>
        // <div className="flex flex-col sm:bg-muted/50 rounded-4xl sm:px-5 sm:py-10">
        //   <div className="sm:max-w-md sm:mx-auto w-full sm:p-5 sm:bg-card sm:rounded-4xl sm:border">
        //     {pokes.map((poke, idx) => (
        //       <div key={poke.pokeKey}>
        //         {idx > 0 && <div className="sm:bg-border w-full h-px my-2" />}
        //         <PokeCardHorizontal poke={poke} />
        //       </div>
        //     ))}
        //   </div>
        // </div>
      )}
    </div>
  );
}
