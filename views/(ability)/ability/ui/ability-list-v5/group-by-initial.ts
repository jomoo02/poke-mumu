import type { Ability } from '@/entities/ability/model';

/** 색인 바에 항상 노출하는 기본 초성 14개 (쌍자음은 기본자로 병합) */
export const HANGUL_INITIALS = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

/** 한글 완성형이 아닌 이름(숫자·영문 등)을 모으는 그룹 */
export const ETC_INITIAL = '#';

export type HangulInitial = (typeof HANGUL_INITIALS)[number];
export type IndexKey = HangulInitial | typeof ETC_INITIAL;

export interface AbilityIndexGroup {
  key: IndexKey;
  anchorId: string;
  abilities: Ability[];
}

export interface AbilityIndexChip {
  key: IndexKey;
  anchorId: string;
  /** 0이면 검색 결과에 없는 초성 → 비활성 */
  count: number;
}

const HANGUL_SYLLABLE_START = 0xac00;
const HANGUL_SYLLABLE_END = 0xd7a3;
/** 중성 21 × 종성 28 */
const SYLLABLES_PER_INITIAL = 588;

/**
 * 유니코드 19초성 순서(ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ)를
 * 기본자 14개로 접는 테이블.
 */
const INITIAL_BY_CHOSEONG_INDEX: readonly HangulInitial[] = [
  'ㄱ',
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅂ',
  'ㅅ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

/** 이름 첫 글자의 색인 키. 완성형 한글이 아니면 '#'. */
export function getIndexKey(name: string): IndexKey {
  const code = name.trimStart().codePointAt(0);

  if (
    code === undefined ||
    code < HANGUL_SYLLABLE_START ||
    code > HANGUL_SYLLABLE_END
  ) {
    return ETC_INITIAL;
  }

  const choseongIndex = Math.floor(
    (code - HANGUL_SYLLABLE_START) / SYLLABLES_PER_INITIAL,
  );

  return INITIAL_BY_CHOSEONG_INDEX[choseongIndex] ?? ETC_INITIAL;
}

/**
 * 섹션 앵커 id. '#'는 URL 프래그먼트 안에서 모호하므로 'etc'로 치환한다.
 * 한글 초성 id는 브라우저가 프래그먼트를 UTF-8로 디코딩해 매칭한다.
 */
export function getIndexAnchorId(key: IndexKey): string {
  return `ability-index-${key === ETC_INITIAL ? 'etc' : key}`;
}

/** 스크린리더용 이름. '#'는 '기타'로 읽힌다. */
export function getIndexLabel(key: IndexKey): string {
  return key === ETC_INITIAL ? '기타' : key;
}

/**
 * 이미 정렬된 목록을 초성별로 묶는다. 그룹 안의 순서는 입력 순서를 그대로 유지한다.
 * 그룹 순서는 ㄱ…ㅎ, 마지막에 '#'. 항목이 없는 그룹은 만들지 않는다.
 */
export function groupAbilitiesByInitial(
  abilities: Ability[],
): AbilityIndexGroup[] {
  const buckets = new Map<IndexKey, Ability[]>();

  for (const ability of abilities) {
    const key = getIndexKey(ability.nameKo);
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.push(ability);
    } else {
      buckets.set(key, [ability]);
    }
  }

  const order: IndexKey[] = [...HANGUL_INITIALS, ETC_INITIAL];

  return order.flatMap((key) => {
    const bucket = buckets.get(key);

    return bucket
      ? [{ key, anchorId: getIndexAnchorId(key), abilities: bucket }]
      : [];
  });
}

/** 색인 바 칩 목록. 14초성은 항상, '#'는 해당 항목이 있을 때만 포함한다. */
export function buildIndexChips(
  groups: AbilityIndexGroup[],
): AbilityIndexChip[] {
  const countByKey = new Map(
    groups.map((group) => [group.key, group.abilities.length]),
  );

  const keys: IndexKey[] = countByKey.has(ETC_INITIAL)
    ? [...HANGUL_INITIALS, ETC_INITIAL]
    : [...HANGUL_INITIALS];

  return keys.map((key) => ({
    key,
    anchorId: getIndexAnchorId(key),
    count: countByKey.get(key) ?? 0,
  }));
}
