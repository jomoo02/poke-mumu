import { notFound } from 'next/navigation';

import { PageContainer } from '@/shared/ui/container';
import {
  getVersionGroupContent,
  getRegions,
} from '@/entities/version-group/api';

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

  // 존재하지 않는 versionGroup이면 지역이 하나도 없다 → 루트 404로.
  if (!regions || regions.length === 0) {
    notFound();
  }

  return (
    <PageContainer>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-balance break-keep whitespace-pre-line">
          {nameKo} 버전 도감
        </h1>
        {description && (
          <p className="text-foreground/70 whitespace-pre-line text-balance break-keep pt-3">
            {description}
          </p>
        )}
      </div>

      <RegionTab versionGroup={versionGroup} regions={regions} />

      {children}
    </PageContainer>
  );
}
