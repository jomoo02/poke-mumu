import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

import type { GenGroup } from '../api';

interface RegionalPokedexListProps {
  genGroups: GenGroup[];
}

export default function RegionalPokedexList({
  genGroups,
}: RegionalPokedexListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {genGroups.map(({ versionGroups, title }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-4">
              {versionGroups.map((vg) => (
                <Link
                  key={vg.identifier}
                  href={vg.href}
                  className={cn(
                    'block bg-accent/50 rounded-2xl hover:bg-accent active:bg-accent border border-transparent focus-visible:border-ring',
                    'outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50',
                  )}
                >
                  <div className="flex justify-between px-4 py-3.5 items-center gap-x-3.5">
                    <div className="flex flex-col gap-1 flex-1 overflow-hidden">
                      <div className="font-medium truncate">{vg.nameKo}</div>
                      <div className="text-sm text-muted-foreground font-medium line-clamp-2 text-balance break-keep text-ellipsis">
                        {vg.nameEn}
                      </div>
                    </div>
                    <ChevronRightIcon className="size-4.5" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
