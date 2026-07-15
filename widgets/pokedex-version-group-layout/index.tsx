import { PageContainer } from '@/shared/ui/container';
import { getVersionGroupContent, getRegions } from './api';
import RegionTab from './ui/region-tab';

interface PokedexVersionGroupLayoutProps {
  versionGroup: string;
  children: React.ReactNode;
}

export default async function PokedexVersionGroupLayout({
  versionGroup,
  children,
}: PokedexVersionGroupLayoutProps) {
  const [{ nameKo, description }, regions] = await Promise.all([
    getVersionGroupContent(versionGroup),
    getRegions(versionGroup),
  ]);

  return (
    <PageContainer>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-balance break-keep">
          {nameKo} 버전 도감
        </h1>
        {description && (
          <p className="text-foreground/70 whitespace-pre-line text-balance break-keep pt-3">
            {description}
          </p>
        )}
      </div>

      {regions && <RegionTab versionGroup={versionGroup} regions={regions} />}

      {children}
    </PageContainer>
  );
}
