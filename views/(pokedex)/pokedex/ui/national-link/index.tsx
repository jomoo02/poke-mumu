'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { getPokeSpriteSrc } from '@/entities/poke/model';
import { cn } from '@/shared/lib/cn';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { useFitScale } from './useFItScale';
import { DATA, TILE } from './config';

export default function NationalLink() {
  const { boxRef, scaleRef } = useFitScale();

  return (
    <Card
      render={
        <Link
          href={'/pokedex/national'}
          className="focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none "
        />
      }
      className="group"
    >
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl font-bold">전국도감</CardTitle>
          <CardDescription className="text-sm">
            모든 포켓몬 목록
          </CardDescription>
        </div>

        <div
          className={cn(
            'size-10 rounded-xl shrink-0 flex items-center justify-center transition-colors duration-300',
            'bg-primary/10 dark:bg-primary/70 dark:group-hover:bg-primary dark:text-primary-foreground/70 dark:group-hover:text-primary-foreground group-hover:bg-primary text-primary group-hover:text-primary-foreground',
          )}
        >
          <ArrowUpRightIcon className="size-5" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-row justify-center items-center px-0 flex-1 opacity-95">
        <div
          ref={boxRef}
          style={{ aspectRatio: '400 / 360', opacity: 0 }}
          className={cn(
            'relative flex items-center justify-center overflow-hidden',

            'mask-[linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]',
          )}
        >
          <div
            ref={scaleRef}
            className="flex-none grid gap-4 transform-[scale(var(--graphic-scale,0.8575))]"
          >
            {DATA.map((row, i) => (
              <div key={i} className="flex gap-4 justify-center">
                {row.map((d) => (
                  <div key={d} className="p-1.75 rounded-2xl bg-muted/70">
                    <PokeSprite src={getPokeSpriteSrc(d)} alt={d} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PokeSprite({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative" style={{ width: TILE, height: TILE }}>
      <Image
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
    </div>
  );
}
