/**
 * version_group 단일 출처. 실제 DB 행(id 1~23)으로 검증됨.
 * change_log 등에서 id 저장 / identifier 표시에 사용.
 */
export interface VersionGroup {
  id: number;
  identifier: string;
  generation: number;
}

export const VERSION_GROUPS: readonly VersionGroup[] = [
  { id: 1, identifier: 'red-blue', generation: 1 },
  { id: 2, identifier: 'yellow', generation: 1 },
  { id: 3, identifier: 'gold-silver', generation: 2 },
  { id: 4, identifier: 'crystal', generation: 2 },
  { id: 5, identifier: 'ruby-sapphire', generation: 3 },
  { id: 6, identifier: 'emerald', generation: 3 },
  { id: 7, identifier: 'firered-leafgreen', generation: 3 },
  { id: 8, identifier: 'diamond-pearl', generation: 4 },
  { id: 9, identifier: 'platinum', generation: 4 },
  { id: 10, identifier: 'heartgold-soulsilver', generation: 4 },
  { id: 11, identifier: 'black-white', generation: 5 },
  { id: 12, identifier: 'black-2-white-2', generation: 5 },
  { id: 13, identifier: 'x-y', generation: 6 },
  { id: 14, identifier: 'omega-ruby-alpha-sapphire', generation: 6 },
  { id: 15, identifier: 'sun-moon', generation: 7 },
  { id: 16, identifier: 'ultra-sun-ultra-moon', generation: 7 },
  { id: 17, identifier: 'lets-go-pikachu-lets-go-eevee', generation: 7 },
  { id: 18, identifier: 'sword-shield', generation: 8 },
  { id: 19, identifier: 'brilliant-diamond-and-shining-pearl', generation: 8 },
  { id: 20, identifier: 'legends-arceus', generation: 8 },
  { id: 21, identifier: 'scarlet-violet', generation: 9 },
  { id: 22, identifier: 'legends-z-a', generation: 9 },
  { id: 23, identifier: 'champions', generation: 9 },
] as const;

const VG_BY_ID = new Map(VERSION_GROUPS.map((v) => [v.id, v]));

export function versionGroupIdentifier(id: number): string {
  return VG_BY_ID.get(id)?.identifier ?? `vg-${id}`;
}
