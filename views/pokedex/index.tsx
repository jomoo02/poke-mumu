import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import {
  generation1,
  generation2,
  generation3,
  generation4,
  generation5,
  generation6,
  generation7,
  generation8,
  generation9,
} from './config';
import Image from 'next/image';
import RegionalPokedexList from './ui/regional-pokedex';

const regionalDex = [
  { gen: '1', genDexs: generation1 },
  { gen: '2', genDexs: generation2 },
  { gen: '3', genDexs: generation3 },
  { gen: '4', genDexs: generation4 },
  { gen: '5', genDexs: generation5 },
  { gen: '6', genDexs: generation6 },
  { gen: '7', genDexs: generation7 },
  { gen: '8', genDexs: generation8 },
  { gen: '9', genDexs: generation9 },
];

export default function PokedexPageView() {
  return (
    <div className="max-w-7xl 2xl:max-w-350 mx-auto px-4 sm:px-6 py-12 w-full min-h-svh flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold tracking-wide">도감</h1>
        <p className="pt-3 text-muted-foreground">
          전국도감 및 버전별 지역도감
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-wide">전국 도감</h2>
        <p className="pt-3 text-muted-foreground text-md">모든 포켓몬 목록</p>
        <div className="w-full pt-6">
          <PokedexItem
            href="/pokedex/all"
            title="전국도감"
            content="National Pokédex"
            className="p-6 rounded-4xl"
          />
        </div>
      </section>
      <section>
        <RegionalPokedexList />
      </section>

      <section className="mt-12">
        <div className="">
          <h2 className="text-2xl font-bold tracking-wide">지역 도감</h2>
          <p className="pt-3 text-muted-foreground text-md">
            각 게임 버전에 등장하는 포켓몬 목록
          </p>
          <div className="pt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalDex.map(({ gen, genDexs }) => (
              <Card key={gen}>
                <CardHeader>
                  <CardTitle>{gen}세대</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardGroup>
                    {genDexs.map(({ title, href, subTitle }) => (
                      <PokedexItem
                        key={title}
                        href={href}
                        title={title}
                        content={subTitle}
                      />
                    ))}
                  </CardGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface PokedexItemProps {
  title: string;
  content?: string;
  href: string;
  className?: string;
}

function PokedexItem({ title, content, href, className }: PokedexItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex p-4 gap-x-4 justify-between items-center rounded-2xl bg-card overflow-hidden',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'bg-muted/70 hover:bg-muted active:bg-muted',
        className,
      )}
    >
      <div className="flex flex-col flex-1 overflow-hidden gap-y-0.5">
        <div className="line-clamp-1 font-medium">{title}</div>
        <div className="text-muted-foreground text-sm line-clamp-1">
          {content}
        </div>
      </div>

      <ChevronRightIcon className="size-4.5 shrink-0" />
    </Link>
  );
}
