type GenerationDex = {
  title: string;
  href: string;
  subTitle?: string;
  content?: string;
  labels?: string[];
};

interface RegionalPokedex {
  title: string;
  href: string;
  subTitle: string;
}

interface RegionalPokedexList {
  region: string;
  pokedexs: RegionalPokedex[];
}
export const REGIONAL_POKEDEX_LIST: RegionalPokedexList[] = [
  {
    region: '관동지방',
    pokedexs: [
      {
        title: '레드·그린·블루',
        href: '/pokedex/game/red-blue/kanto',
        subTitle: 'Red·Green·Blue',
      },
      {
        title: '피카츄',
        href: '/pokedex/game/yellow/kanto',
        subTitle: 'Yellow',
      },
      {
        title: '파이어레드·리프그린',
        href: '/pokedex/game/firered-leafgreen/kanto',
        subTitle: 'FireRed·LeafGreen',
      },
      {
        title: '레츠고! 피카츄·레츠고! 이브이',
        href: '/pokedex/game/lets-go-pikachu-lets-go-eevee/kanto',
        subTitle: `Let's Go, Pikachu!·Let's Go, Eevee!`,
      },
    ],
  },
  {
    region: '성도지방',
    pokedexs: [
      {
        title: '골드·실버',
        href: '/pokedex/game/gold-silver',
        subTitle: 'Gold·Silver & Crystal',
      },
      {
        title: '크리스탈',
        href: '/pokedex/game/crystal',
        subTitle: 'Gold·Silver & Crystal',
      },
      {
        title: '하트골드·소울실버',
        href: '/pokedex/game/heartgold-soulsilver',
        subTitle: 'HeartGold·SoulSilver',
      },
    ],
  },
  {
    region: '호연지방',
    pokedexs: [
      {
        title: '루비·사파이어',
        href: '/pokedex/game/ruby-sapphire',
        subTitle: 'Ruby·Sapphire·Emerald',
      },
      {
        title: '에메랄드',
        href: '/pokedex/game/emerald',
        subTitle: 'Ruby·Sapphire·Emerald',
      },
      {
        title: '오메가루비·알파사파이어',
        href: '/pokedex/game/omega-ruby-alpha-sapphire',
        subTitle: 'Omega Ruby·Alpha Sapphire',
      },
    ],
  },
  {
    region: '신오지방',
    pokedexs: [
      {
        title: '디아루가·펄기아',
        href: '/pokedex/game/diamond-pearl',
        subTitle: 'Diamond·Pearl',
      },
      {
        title: '기라티나',
        href: '/pokedex/game/platinum',
        subTitle: 'Platinum',
      },
      {
        title: '브릴리언트 다이아몬드·샤이닝 펄',
        href: '/pokedex/game/brilliant-diamond-shining-pearl',
        subTitle: 'Brilliant Diamond·Shining Pearl',
      },
    ],
  },
  {
    region: '하나지방',
    pokedexs: [
      {
        title: '블랙·화이트',
        href: '/pokedex/game/black-white',
        subTitle: 'Black·White',
      },
      {
        title: '블랙 2·화이트 2',
        href: '/pokedex/game/black-2-white-2',
        subTitle: 'Black 2·White 2',
      },
    ],
  },
  {
    region: '칼로스지방',
    pokedexs: [
      {
        title: 'X·Y (센트럴 칼로스)',
        href: '/pokedex/game/x-y/central-kalos',
        subTitle: '센트럴 칼로스',
      },
      {
        title: 'X·Y (코스트 칼로스)',
        href: '/pokedex/game/x-y/coastal-kalos',
        subTitle: '코스트 칼로스',
      },
      {
        title: 'X·Y (마운틴 칼로스)',
        href: '/pokedex/game/x-y/mountain-kalos',
        subTitle: '마운틴 칼로스',
      },
    ],
  },
  {
    region: '알로라지방',
    pokedexs: [
      {
        title: '썬·문',
        href: '/pokedex/game/sun-moon',
        subTitle: 'Sun·Moon',
      },
      {
        title: '울트라썬·울트라문',
        href: '/pokedex/game/ultra-sun-ultra-moon',
        subTitle: 'Ultra Sun·Ultra Moon',
      },
    ],
  },
  {
    region: '가라르지방',
    pokedexs: [
      {
        title: '소드·실드',
        href: '/pokedex/game/sword-shield',
        subTitle: 'Sword·Shield',
      },
    ],
  },
  {
    region: '히스이지방',
    pokedexs: [
      {
        title: 'LEGENDS 아르세우스',
        href: '/pokedex/game/legends-arceus',
        subTitle: 'LEGENDS Arceus',
      },
    ],
  },
  {
    region: '팔데아지방',
    pokedexs: [
      {
        title: '스칼렛·바이올렛',
        href: '/pokedex/game/scarlet-violet',
        subTitle: 'Scarlet·Violet',
      },
    ],
  },
  {
    region: '미르시티',
    pokedexs: [
      {
        title: 'LEGENDS Z-A',
        href: '/pokedex/game/legends-z-a',
        subTitle: 'LEGENDS Z-A',
      },
    ],
  },
];

export const generation3: GenerationDex[] = [
  {
    title: '루비·사파이어 & 에메랄드',
    href: '/pokedex/game/ruby-sapphire-emerald',
    subTitle: 'Ruby·Sapphire·Emerald',
    content: '호연지방',
    labels: ['호연'],
  },
  {
    title: '파이어레드·리프그린',
    href: '/pokedex/game/firered-leafgreen',
    subTitle: 'FireRed·LeafGreen',
    content: '관동지방',
    labels: ['관동'],
  },
];

export const generation4: GenerationDex[] = [
  {
    title: '디아루가·펄기아',
    href: '/pokedex/game/diamond-pearl',
    subTitle: 'Diamond·Pearl',
    content: '신오지방',
    labels: ['신오'],
  },
  {
    title: '기라티나',
    href: '/pokedex/game/platinum',
    subTitle: 'Platinum',
    content: '신오지방',
    labels: ['신오'],
  },
];

export const generation5: GenerationDex[] = [
  {
    title: '블랙·화이트',
    href: '/pokedex/game/black-white',
    subTitle: 'Black·White',
    content: '하나지방',
    labels: ['하나'],
  },
  {
    title: '블랙 2·화이트 2',
    href: '/pokedex/game/black-2-white-2',
    subTitle: 'Black 2·White 2',
    content: '하나지방',
    labels: ['하나'],
  },
];

export const generation6: GenerationDex[] = [
  {
    title: 'X·Y',
    href: '/pokedex/game/x-y',
    subTitle: 'X·Y',
    content: '칼로스지방',
    labels: ['센트럴 칼로스', '코스트 칼로스', '마운틴 칼로스'],
  },
  {
    title: '오메가루비·알파사파이어',
    href: '/pokedex/game/omega-ruby-alpha-sapphire',
    subTitle: 'Omega Ruby·Alpha Sapphire',
    content: '호연지방',
    labels: ['호연'],
  },
];

export const generation7: GenerationDex[] = [
  {
    title: '썬·문',
    href: '/pokedex/game/sun-moon',
    subTitle: 'Sun·Moon',
    content: '알로라지방',
    labels: ['알로라', '멜레멜레', '아칼라', '울라울라', '포니'],
  },
  {
    title: '울트라썬·울트라문',
    href: '/pokedex/game/ultra-sun-ultra-moon',
    subTitle: 'Ultra Sun·Ultra Moon',
    content: '알로라지방',
    labels: ['알로라', '멜레멜레', '아칼라', '울라울라', '포니'],
  },

  {
    title: '레츠고! 피카츄·레츠고! 이브이',
    href: '/pokedex/game/lets-go-pikachu-letgs-go-eevee',
    subTitle: `Let's Go, Pikachu!·Let's Go, Eevee!`,
    content: '관동지방',
    labels: ['관동'],
  },
];

export const generation8: GenerationDex[] = [
  {
    title: '소드·실드',
    href: '/pokedex/game/sword-shield',
    subTitle: 'Sword·Shield',
    content: '가라르지방',
    labels: ['가라르', '갑옷섬', '왕관설원'],
  },
  {
    title: '브릴리언트 다이아몬드·샤이닝 펄',
    href: '/pokedex/game/brilliant-diamond-shining-pearl',
    subTitle: 'Brilliant Diamond·Shining Pearl',
    content: '신오지방',
    labels: ['신오'],
  },
  {
    title: 'LEGENDS 아르세우스',
    href: '/pokedex/game/legends-arceus',
    subTitle: 'LEGENDS Arceus',
    content: '히스이지방',
    labels: ['히스이'],
  },
];

export const generation9: GenerationDex[] = [
  {
    title: '스칼렛·바이올렛',
    href: '/pokedex/game/scarlet-violet',
    subTitle: 'Scarlet·Violet',
    content: '팔데아지방',
    labels: ['팔데아', '북신', '블루베리'],
  },
  {
    title: 'LEGENDS Z-A',
    href: '/pokedex/game/legends-z-a',
    subTitle: 'LEGENDS Z-A',
    content: '미르시티',
    labels: ['미르', '이차원'],
  },
];
