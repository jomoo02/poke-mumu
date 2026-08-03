'use client';

import { cn } from '@/shared/lib/cn';
import { createSearchMatcher } from '@/shared/lib/search';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

import { ChevronsDownIcon, ChevronsUpIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export interface Nature {
  ko: string;
  ja: string;
  en: string;
  identifier: string;
}

export const NATURE_LIST: { label: string; natures: Nature[] }[] = [
  {
    label: '공격',
    natures: [
      {
        ko: '노력',
        ja: 'がんばりや',
        en: 'Hardy',
        identifier: 'hardy',
      },
      {
        ko: '외로움',
        ja: 'さみしがり',
        en: 'Lonely',
        identifier: 'lonely',
      },
      {
        ko: '고집',
        ja: 'いじっぱり',
        en: 'Adamant',
        identifier: 'adamant',
      },

      {
        ko: '개구쟁이',
        ja: 'やんちゃ',
        en: 'Naughty',
        identifier: 'naughty',
      },
      {
        ko: '용감',
        ja: 'ゆうかん',
        en: 'Brave',
        identifier: 'brave',
      },
    ],
  },
  {
    label: '방어',
    natures: [
      {
        ko: '대담',
        ja: 'ずぶとい',
        en: 'Bold',
        identifier: 'bold',
      },
      {
        ko: '온순',
        ja: 'すなお',
        en: 'Docile',
        identifier: 'docile',
      },
      {
        ko: '장난꾸러기',
        ja: 'わんぱく',
        en: 'Impish',
        identifier: 'impish',
      },
      {
        ko: '촐랑',
        ja: 'のうてんき',
        en: 'Lax',
        identifier: 'lax',
      },
      {
        ko: '무사태평',
        ja: 'のんき',
        en: 'Relaxed',
        identifier: 'relaxed',
      },
    ],
  },

  {
    label: '특수공격',
    natures: [
      {
        ko: '조심',
        ja: 'ひかえめ',
        en: 'Modest',
        identifier: 'modest',
      },
      {
        ko: '의젓',
        ja: 'おっとり',
        en: 'Mild',
        identifier: 'mild',
      },
      {
        ko: '성실',
        ja: 'まじめ',
        en: 'Serious',
        identifier: 'serious',
      },
      {
        ko: '덜렁',
        ja: 'うっかりや',
        en: 'Rash',
        identifier: 'rash',
      },
      {
        ko: '냉정',
        ja: 'れいせい',
        en: 'Quiet',
        identifier: 'quiet',
      },
    ],
  },
  {
    label: '특수방어',
    natures: [
      {
        ko: '차분',
        ja: 'おだやか',
        en: 'Calm',
        identifier: 'calm',
      },
      {
        ko: '얌전',
        ja: 'おとなしい',
        en: 'Gentle',
        identifier: 'gentle',
      },
      {
        ko: '신중',
        ja: 'しんちょう',
        en: 'Careful',
        identifier: 'careful',
      },
      {
        ko: '수줍음',
        ja: 'てれや',
        en: 'Bashful',
        identifier: 'bashful',
      },
      {
        ko: '건방',
        ja: 'なまいき',
        en: 'Sassy',
        identifier: 'sassy',
      },
    ],
  },
  {
    label: '스피드',
    natures: [
      {
        ko: '겁쟁이',
        ja: 'おくびょう',
        en: 'Timid',
        identifier: 'timid',
      },
      {
        ko: '성급',
        ja: 'せっかち',
        en: 'Hasty',
        identifier: 'hasty',
      },
      {
        ko: '명랑',
        ja: 'ようき',
        en: 'Jolly',
        identifier: 'jolly',
      },
      {
        ko: '천진난만',
        ja: 'むじゃき',
        en: 'Naive',
        identifier: 'naive',
      },
      {
        ko: '변덕',
        ja: 'きまぐれ',
        en: 'Quirky',
        identifier: 'quirky',
      },
    ],
  },
];

export default function NatureTable() {
  const heads = ['공격', '방어', '특수공격', '특수방어', '스피드'];

  const searchParams = useSearchParams();

  const checkSearchNature = (nature: Nature) => {
    const urlValue = searchParams.get('nature') ?? '';
    if (!urlValue) {
      return false;
    }
    const matchesKeyword = createSearchMatcher(urlValue);

    return matchesKeyword(nature.ko, nature.en, nature.ja);
  };

  return (
    <div className="overflow-hidden rounded-2xl">
      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          <TableRow>
            <TableHead className=" sticky left-0 z-10 rounded-tl-2xl px-0 py-0 w-30 sm:w-34">
              <div className="border-b w-30 sm:w-34 bg-zinc-50 dark:bg-zinc-800 h-[46px] px-4" />
            </TableHead>
            {heads.map((head) => (
              <TableHead
                key={head}
                className="bg-zinc-50 dark:bg-zinc-800 border-b py-0"
              >
                <div className="flex items-center gap-1 h-[46px]">
                  {head}
                  <ChevronsDownIcon className="inline-flex size-5 text-blue-600 dark:text-blue-500" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {NATURE_LIST.map(({ label, natures }, idx) => (
            <TableRow key={label} className="border-b-0">
              <TableCell className="bg-card text-md font-medium sticky left-0 z-10 p-0">
                <div
                  className={cn(
                    'flex items-center gap-1 px-4 h-[78px] bg-zinc-50 dark:bg-zinc-800',
                    idx === NATURE_LIST.length - 1 ? 'border-b-0' : 'border-b ',
                  )}
                >
                  {label}
                  <ChevronsUpIcon className="inline-flex size-5 text-red-600 dark:text-red-500" />
                </div>
              </TableCell>
              {natures.map((nature) => (
                <TableCell
                  key={nature.identifier}
                  className={cn(
                    ' transition-colors duration-150 p-0',
                    checkSearchNature(nature)
                      ? 'bg-primary/10 dark:bg-primary/70'
                      : 'bg-card',
                  )}
                >
                  <div
                    className={cn(
                      'h-[78px] px-4 flex flex-col justify-center',
                      idx === NATURE_LIST.length - 1
                        ? 'border-b-0'
                        : 'border-b ',
                    )}
                  >
                    <div>{nature.ko}</div>
                    <div className="text-sm text-foreground/70">
                      {nature.en} / {nature.ja}
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
