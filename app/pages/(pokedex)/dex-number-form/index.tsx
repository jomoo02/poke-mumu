import { getPokeData } from './api';
import BaseStats from './ui/base-stats';
import DexInfo from './ui/dex-info';
import MinMaxStats from './ui/min-max-stats';
import Breeding from './ui/resf-info/breeding';
import Training from './ui/resf-info/training';

interface PokedexDexNumberFormPageUIProps {
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageUI({
  pokeKey,
}: PokedexDexNumberFormPageUIProps) {
  const { dexInfo, training, breeding, stats } = await getPokeData(pokeKey);

  return (
    <div className="flex flex-col w-full mx-auto max-w-7xl p-6 px-4 sm:px-6">
      {/* <div className="grid lg:grid-cols-3 gap-6"> */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-6 lg:max-w-92 w-full">
          <section>
            <DexInfo dexInfo={dexInfo} />
          </section>
          <section>
            <Breeding breeding={breeding} />
          </section>
          <section>
            <Training training={training} />
          </section>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2 lg:flex-1 h-full">
          <section className="grid lg:grid-cols-2 gap-6">
            {stats && <BaseStats stats={stats} />}
            {stats && <MinMaxStats stats={stats} />}
          </section>
        </div>
      </div>
    </div>
  );
}
