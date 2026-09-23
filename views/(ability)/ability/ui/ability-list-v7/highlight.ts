import { normalizeSearchText } from '@/shared/lib/search';

export interface HighlightSegment {
  text: string;
  highlighted: boolean;
}

interface SourceRange {
  start: number;
  end: number;
}

/**
 * 검색어와 일치하는 구간을 원문 기준으로 잘라 강조 여부를 붙인다.
 *
 * 매칭은 normalizeSearchText(NFC · 소문자 · 공백 제거) 기준이라, 정규화된 문자열의 인덱스를
 * 원문 인덱스로 되돌려야 한다. 원문을 한 글자씩 정규화하면서 "정규화 문자 → 원문 글자 범위" 표를 만든다.
 *
 * - 공백을 사이에 둔 일치('지않' → '가시지 않는')는 공백까지 포함해 한 구간으로 강조한다.
 * - 한 글자씩 정규화한 결과가 문자열 전체 정규화와 다르면(문맥 의존 소문자 변환 등)
 *   인덱스를 믿을 수 없으므로 강조 없이 원문 그대로 돌려준다.
 */
export function splitHighlightSegments(
  text: string,
  query: string,
): HighlightSegment[] {
  const fallback: HighlightSegment[] = [{ text, highlighted: false }];
  const keyword = normalizeSearchText(query);

  if (keyword === '' || text === '') return fallback;

  // NFD로 들어온 원문도 조합형으로 맞춘 뒤 자른다. 화면상 글자는 같다.
  const source = text.normalize('NFC');

  let normalized = '';
  // normalized[i]가 원문 source의 어느 글자 범위에서 왔는지
  const sourceRanges: SourceRange[] = [];
  let offset = 0;

  for (const char of source) {
    const start = offset;
    offset += char.length;

    if (/\s/.test(char)) continue;

    const lowered = char.toLowerCase();
    normalized += lowered;

    // 소문자 변환으로 길이가 늘어난 경우('İ' → 'i̇')에도 각 코드 유닛이 같은 원문 글자를 가리킨다.
    for (let i = 0; i < lowered.length; i += 1) {
      sourceRanges.push({ start, end: offset });
    }
  }

  if (normalized !== normalizeSearchText(text)) return fallback;

  const matches: SourceRange[] = [];
  let from = normalized.indexOf(keyword);

  while (from !== -1) {
    const first = sourceRanges[from];
    const last = sourceRanges[from + keyword.length - 1];

    if (!first || !last) return fallback;

    const previous = matches[matches.length - 1];

    // 맞닿은 일치 구간은 합쳐 <mark>가 쪼개져 보이지 않게 한다.
    if (previous && previous.end >= first.start) {
      previous.end = Math.max(previous.end, last.end);
    } else {
      matches.push({ start: first.start, end: last.end });
    }

    from = normalized.indexOf(keyword, from + keyword.length);
  }

  if (matches.length === 0) return fallback;

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const { start, end } of matches) {
    if (start > cursor) {
      segments.push({ text: source.slice(cursor, start), highlighted: false });
    }

    segments.push({ text: source.slice(start, end), highlighted: true });
    cursor = end;
  }

  if (cursor < source.length) {
    segments.push({ text: source.slice(cursor), highlighted: false });
  }

  return segments;
}
