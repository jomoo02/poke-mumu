type Stat = 'attack' | 'defense' | 'speed' | 'specialAttack' | 'specialDefense';

interface Nature {
  ko: string;
  ja: string;
  en: string;
  identifier: string;
  increase: Stat | null;
  decrease: Stat | null;
}

export const NATURES: Nature[] = [
  // ── 공격 상승 (4개) ─────────────────────────────────────
  {
    ko: '외로움',
    ja: 'さみしがり',
    en: 'Lonely',
    identifier: 'lonely',
    increase: 'attack',
    decrease: 'defense',
  },
  {
    ko: '고집',
    ja: 'いじっぱり',
    en: 'Adamant',
    identifier: 'adamant',
    increase: 'attack',
    decrease: 'specialAttack',
  },

  {
    ko: '개구쟁이',
    ja: 'やんちゃ',
    en: 'Naughty',
    identifier: 'naughty',
    increase: 'attack',
    decrease: 'specialDefense',
  },
  {
    ko: '용감',
    ja: 'ゆうかん',
    en: 'Brave',
    identifier: 'brave',
    increase: 'attack',
    decrease: 'speed',
  },

  // ── 방어 상승 (4개) ─────────────────────────────────────
  {
    ko: '대담',
    ja: 'ずぶとい',
    en: 'Bold',
    identifier: 'bold',
    increase: 'defense',
    decrease: 'attack',
  },
  {
    ko: '장난꾸러기',
    ja: 'わんぱく',
    en: 'Impish',
    identifier: 'impish',
    increase: 'defense',
    decrease: 'specialAttack',
  },
  {
    ko: '촐랑',
    ja: 'のうてんき',
    en: 'Lax',
    identifier: 'lax',
    increase: 'defense',
    decrease: 'specialDefense',
  },
  {
    ko: '무사태평',
    ja: 'のんき',
    en: 'Relaxed',
    identifier: 'relaxed',
    increase: 'defense',
    decrease: 'speed',
  },
  // ── 특수공격 상승 (4개) ─────────────────────────────────
  {
    ko: '조심',
    ja: 'ひかえめ',
    en: 'Modest',
    identifier: 'modest',
    increase: 'specialAttack',
    decrease: 'attack',
  },
  {
    ko: '의젓',
    ja: 'おっとり',
    en: 'Mild',
    identifier: 'mild',
    increase: 'specialAttack',
    decrease: 'defense',
  },
  {
    ko: '덜렁',
    ja: 'うっかりや',
    en: 'Rash',
    identifier: 'rash',
    increase: 'specialAttack',
    decrease: 'specialDefense',
  },
  {
    ko: '냉정',
    ja: 'れいせい',
    en: 'Quiet',
    identifier: 'quiet',
    increase: 'specialAttack',
    decrease: 'speed',
  },

  // ── 특수방어 상승 (4개) ─────────────────────────────────
  {
    ko: '차분',
    ja: 'おだやか',
    en: 'Calm',
    identifier: 'calm',
    increase: 'specialDefense',
    decrease: 'attack',
  },
  {
    ko: '얌전',
    ja: 'おとなしい',
    en: 'Gentle',
    identifier: 'gentle',
    increase: 'specialDefense',
    decrease: 'defense',
  },
  {
    ko: '신중',
    ja: 'しんちょう',
    en: 'Careful',
    identifier: 'careful',
    increase: 'specialDefense',
    decrease: 'specialAttack',
  },
  {
    ko: '건방',
    ja: 'なまいき',
    en: 'Sassy',
    identifier: 'sassy',
    increase: 'specialDefense',
    decrease: 'speed',
  },
  // ── 스피드 상승 (4개) ───────────────────────────────────
  {
    ko: '겁쟁이',
    ja: 'おくびょう',
    en: 'Timid',
    identifier: 'timid',
    increase: 'speed',
    decrease: 'attack',
  },
  {
    ko: '성급',
    ja: 'せっかち',
    en: 'Hasty',
    identifier: 'hasty',
    increase: 'speed',
    decrease: 'defense',
  },
  {
    ko: '명랑',
    ja: 'ようき',
    en: 'Jolly',
    identifier: 'jolly',
    increase: 'speed',
    decrease: 'specialAttack',
  },
  {
    ko: '천진난만',
    ja: 'むじゃき',
    en: 'Naive',
    identifier: 'naive',
    increase: 'speed',
    decrease: 'specialDefense',
  },
  // ── 중립 (5개) ──────────────────────────────────────────
  {
    ko: '노력',
    ja: 'がんばりや',
    en: 'Hardy',
    identifier: 'hardy',
    increase: null,
    decrease: null,
  },
  {
    ko: '온순',
    ja: 'すなお',
    en: 'Docile',
    identifier: 'docile',
    increase: null,
    decrease: null,
  },
  {
    ko: '성실',
    ja: 'まじめ',
    en: 'Serious',
    identifier: 'serious',
    increase: null,
    decrease: null,
  },
  {
    ko: '수줍음',
    ja: 'てれや',
    en: 'Bashful',
    identifier: 'bashful',
    increase: null,
    decrease: null,
  },
  {
    ko: '변덕',
    ja: 'きまぐれ',
    en: 'Quirky',
    identifier: 'quirky',
    increase: null,
    decrease: null,
  },
];
