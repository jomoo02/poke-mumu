export type DisplaySegment =
  | { kind: 'text'; value: string }
  | { kind: 'ref'; refType: RefType; refKey: string };

export type RefType = 'item' | 'move' | 'poke' | 'location';

const REF_PATTERN = /\[\[(?:([a-z]+):)?([a-z0-9-]+)\]\]/g;
const KNOWN_TYPES: RefType[] = ['item', 'move', 'poke', 'location'];

const isRefType = (s: string): s is RefType => {
  return (KNOWN_TYPES as string[]).includes(s);
};

export const parseDisplay = (text: string): DisplaySegment[] => {
  const segments: DisplaySegment[] = [];
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = REF_PATTERN.exec(text))) {
    if (m.index > cursor) {
      segments.push({ kind: 'text', value: text.slice(cursor, m.index) });
    }
    const rawType = m[1] ?? 'item';
    const refType: RefType = isRefType(rawType) ? rawType : 'item';
    segments.push({ kind: 'ref', refType, refKey: m[2] });
    cursor = m.index + m[0].length;
  }
  if (cursor < text.length) {
    segments.push({ kind: 'text', value: text.slice(cursor) });
  }
  return segments;
};
