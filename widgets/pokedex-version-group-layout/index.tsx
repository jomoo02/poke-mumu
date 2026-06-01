import { getVersionGroupKo, getRegions } from './api';
import RegionTab from './ui/region-tab';

interface PokedexVersionGroupLayoutProps {
  versionGroup: string;
}

export default async function PokedexVersionGroupLayout({
  versionGroup,
}: PokedexVersionGroupLayoutProps) {
  const [vesrionGroupKo, regions] = await Promise.all([
    getVersionGroupKo(versionGroup),
    getRegions(versionGroup),
  ]);

  return (
    <div className="max-w-7xl 2xl:max-w-350 mx-auto px-4 sm:px-6 py-12 w-full flex flex-col gap-6">
      <h1 className="text-4xl font-bold tracking-wide">
        {vesrionGroupKo} 버전 도감
      </h1>

      <div>
        {regions && <RegionTab versionGroup={versionGroup} regions={regions} />}
      </div>
    </div>
  );
}
