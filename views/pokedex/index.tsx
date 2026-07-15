import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { getGenGroupedPokedexes } from './api';
import RegionalPokedexList from './ui/regional-pokedex-list';
import { PageContainer } from '@/shared/ui/container';

export default async function PokedexPageView() {
  const data = await getGenGroupedPokedexes();

  return (
    <PageContainer>
      <div>
        <h1 className="text-4xl font-bold tracking-wide">도감</h1>
        <p className="pt-3 text-foreground/70">전국도감 및 버전별 지역도감</p>
      </div>
      <section className="mt-8">
        <h2 className="text-2xl font-bold tracking-wide">전국 도감</h2>
        <p className="pt-3 text-muted-foreground">모든 포켓몬 목록</p>
        <div className="w-full pt-6">
          <div className="lg:max-w-[50%]">
            <Link
              href={'/pokedex/all'}
              className="block rounded-2xl bg-muted/50 hover:bg-muted border border-transparent"
            >
              <div className="px-4 py-3.5 flex justify-between items-center">
                <div className="font-medium flex flex-col gap-1">
                  <div>전국도감</div>
                  <div className="text-sm text-muted-foreground font-medium line-clamp-2 text-balance break-keep text-ellipsis">
                    National Pokédex
                  </div>
                </div>
                <ChevronRightIcon className="size-4.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold tracking-wide">지역 도감</h2>
        <p className="pt-3 text-muted-foreground">
          각 게임에 등장하는 포켓몬 목록
        </p>
        <div className="pt-6">
          {data && <RegionalPokedexList genGroups={data} />}
        </div>
      </section>
    </PageContainer>
  );
}
