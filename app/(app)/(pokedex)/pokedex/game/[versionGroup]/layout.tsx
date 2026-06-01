import PokedexVersionGroupLayout from '@/widgets/pokedex-version-group-layout';
import { Suspense } from 'react';

interface PokedexGameVersionGroupLayoutProps {
  params: Promise<{ versionGroup: string }>;
  children: React.ReactNode;
}

export default async function PokedexGameVersionGroupLayout({
  params,
  children,
}: PokedexGameVersionGroupLayoutProps) {
  return (
    <>
      <Suspense>
        {params.then(({ versionGroup }) => (
          <PokedexVersionGroupLayout versionGroup={versionGroup} />
        ))}
      </Suspense>

      {children}
    </>
  );
}
