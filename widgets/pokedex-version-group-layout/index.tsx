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
    <div className="max-w-365 mx-auto pt-12 w-full flex flex-col gap-6 px-5 md:px-8 lg:px-10 3xl:px-2.5">
      <h1 className="text-4xl font-bold tracking-wide text-balance break-keep">
        {vesrionGroupKo} 버전 도감
      </h1>

      <div className="mt-6">
        {regions && <RegionTab versionGroup={versionGroup} regions={regions} />}
      </div>
    </div>
  );
}
