import { cn } from '@/shared/lib/cn';
import {
  PageLayoutContainer,
  PageLayoutSection,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';
import Image from 'next/image';
import Link from 'next/link';

const data = [
  {
    title: '8세대',
    versionGroups: [
      {
        identifier: 'sword-shield',
        nameKo: '소드·실드',
        nameEn: 'Sword & Shield',
        srcs: ['sword.webp', 'shield.webp'],
      },
      {
        identifier: 'brilliant-diamond-shining-pearl',
        nameKo: '브릴리언트 다이아몬드·샤이닝 펄',
        nameEn: 'Brilliant Diamond & Shining Pearl',
        srcs: ['brilliant-diamond.webp', 'shining-pearl.webp'],
      },

      // {
      //   identifier: 'legends-arceus',
      //   nameKo: '레전드 아르세우스',
      //   nameEn: 'Legends: Arceus',
      //   srcs: ['legends_arceus.webp'],
      // },
    ],
  },
  {
    title: '9세대',
    versionGroups: [
      {
        identifier: 'scarlet-violet',
        nameKo: '스칼렛·바이올렛',
        nameEn: 'Scarlet & Violet',
        srcs: ['scarlet.webp', 'violet.webp'],
      },
      {
        identifier: 'legends-za',
        nameKo: 'LEGENDS Z-A',
        nameEn: 'Legends: Z-A',
        srcs: ['legends_za.webp'],
      },
    ],
  },
];

export default function CapturePage() {
  return (
    <PageLayoutContainer className="@container md:pl-40 md:py-40 bg-muted/30 dark:bg-card">
      <div className="flex flex-col gap-3 border rounded-2xl overflow-hidden bg-muted pb-3 shadow-2xl scale-95 max-w-[650px]  [mask-image:linear-gradient(to_right,black_70%,transparent)]">
        <div className="flex h-10 items-center gap-1.5 border-b bg-muted px-3">
          <span className="size-3.5 rounded-full bg-muted-foreground/40" />
          <span className="size-3.5 rounded-full bg-muted-foreground/40" />
          <span className="size-3.5 rounded-full bg-muted-foreground/40" />
        </div>

        <div className=" px-3 ">
          <div className="flex flex-col gap-6 bg-card p-6 rounded-lg shadow-lg">
            {data.map(({ title, versionGroups }) => (
              <PageLayoutSection key={title} className="first:mt-0">
                <PageLayoutSectionTitle>{title}</PageLayoutSectionTitle>

                <div className="flex gap-6">
                  {versionGroups.map((versionGroup) => (
                    <PokedexLink
                      key={versionGroup.identifier}
                      versionGroup={versionGroup}
                    />
                  ))}
                </div>
              </PageLayoutSection>
            ))}
          </div>
        </div>
      </div>
    </PageLayoutContainer>
  );
}

function PokedexLink({
  versionGroup,
}: {
  versionGroup: {
    identifier: string;
    nameKo: string;
    nameEn: string;
    srcs: string[];
  };
}) {
  return (
    <div
      className={cn(
        'w-[282px] h-[224px] group relative isolate rounded-4xl shrink-0',
      )}
    >
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
      <GameBoxArts srcs={versionGroup.srcs} />
      <div className="flex-1 flex flex-col pt-1.5">
        <Link
          href={'/'}
          className={cn(
            'truncate outline-none font-medium rounded-xs break-keep text-pretty"',
            'focus-visible:ring-2 focus-visible:ring-ring w-fit',
            'after:absolute after:-inset-1 after:z-10',
          )}
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

function GameBoxArts({ srcs }: { srcs: string[] }) {
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
            alt={`${src}`}
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
