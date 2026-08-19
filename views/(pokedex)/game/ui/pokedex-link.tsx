import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

import type { VersionGroup } from '../api';
import { BOXART_SRC_MAP } from '../config/boxart';

interface PokedexLinkProps {
  versionGroup: VersionGroup;
}

export default function PokedexLink({ versionGroup }: PokedexLinkProps) {
  return (
    <div className={cn('w-full group relative isolate rounded-4xl')}>
      <div
        aria-hidden
        className={cn(
          'absolute -inset-3 -z-10 rounded-4xl pointer-events-none',
          'scale-0 origin-center',
          'transition-transform duration-250 ease-out',
          'group-hover:scale-100 group-has-focus-visible:scale-100',
          'bg-muted',
        )}
      />
      <GameBoxArts identifier={versionGroup.identifier} />
      <div className="flex-1 flex flex-col pt-1.5">
        <Link
          href={versionGroup.href}
          className={cn(
            'truncate outline-none font-medium rounded-xs break-keep text-pretty"',
            'focus-visible:ring-2 focus-visible:ring-ring w-fit',
            'after:absolute after:-inset-1 after:z-10',
          )}
          prefetch={true}
        >
          {versionGroup.nameKo}
        </Link>
        <div className="text-sm font-medium text-foreground/70 break-keep">
          {versionGroup.nameEn}
        </div>
      </div>
    </div>
  );
}

function GameBoxArts({ identifier }: { identifier: string }) {
  const srcs = BOXART_SRC_MAP[identifier];

  return (
    <div
      className={cn(
        'grid bg-muted/70 px-5 py-5 gap-1.5 rounded-4xl justify-items-center aspect-16/10',
        srcs.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
      )}
    >
      {srcs.map((src) => (
        <div key={src} className="size-full max-w-35 relative overflow-hidden">
          <Image
            src={`/logo/${src}`}
            alt={`${identifier}-${src}`}
            fill
            sizes="100px"
            className="object-contain scale-102"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}
