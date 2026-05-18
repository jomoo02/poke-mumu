import { createClient } from '@/app/shared/lib/supabase/client';
import type { PokeMoveResult, PokeMoveVm, PokeMoveZa } from '../model';

const ZA_VG_ID = 22;

/**
 * 포켓몬의 디폴트 vg 결정 (최신 세대의 첫 vg).
 * search param에 vg 없을 때 server component에서 호출.
 */
export async function getDefaultVgForPoke(pokeKey: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_default_vg_for_poke', {
    p_poke_key: pokeKey,
  });
  if (error)
    throw new Error(`getDefaultVgForPoke(${pokeKey}): ${error.message}`);
  if (data == null) {
    throw new Error(`no default vg for poke_key=${pokeKey}`);
  }
  return data as number;
}

/**
 * 포켓몬의 한 vg에서 배우는 모든 기술.
 * vg=22면 ZA view, 아니면 일반 vm view에서 fetch.
 *
 * 결과는 정렬 안 됨. 클라이언트에서 learn_method 기준 정렬·필터.
 */
export async function getPokeMovesByVg(
  pokeKey: string,
  vgId: number,
): Promise<PokeMoveResult> {
  if (vgId === ZA_VG_ID) {
    const moves = await fetchPokeMovesZa(pokeKey);
    return { kind: 'za', vg_id: ZA_VG_ID, moves };
  }
  const moves = await fetchPokeMovesVm(pokeKey, vgId);
  return { kind: 'vm', vg_id: vgId, moves };
}

// ============================================================
// Internal
// ============================================================

async function fetchPokeMovesVm(
  pokeKey: string,
  vgId: number,
): Promise<PokeMoveVm[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('poke_move_vm_view')
    .select('*')
    .eq('poke_key', pokeKey)
    .eq('version_group_id', vgId);

  if (error) {
    throw new Error(`fetchPokeMovesVm(${pokeKey}, ${vgId}): ${error.message}`);
  }
  return (data ?? []) as PokeMoveVm[];
}

async function fetchPokeMovesZa(pokeKey: string): Promise<PokeMoveZa[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('poke_move_za_view')
    .select('*')
    .eq('poke_key', pokeKey);

  if (error) {
    throw new Error(`fetchPokeMovesZa(${pokeKey}): ${error.message}`);
  }
  return (data ?? []) as PokeMoveZa[];
}
export interface AvailableVg {
  versionGroupId: number;
  identifier: string;
  nameKo: string;
  generation: number;
  sortOrder: number;
}

export async function getAvailableVgsForPoke(
  pokeKey: string,
): Promise<AvailableVg[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_available_vgs_for_poke', {
    p_poke_key: pokeKey,
  });

  if (error) {
    console.error('getAvailableVgsForPoke error:', error);
    throw error;
  }

  return (data ?? []).map(
    (row: {
      version_group_id: number;
      identifier: string;
      name_ko: string;
      generation: number;
      sort_order: number;
    }) => ({
      versionGroupId: row.version_group_id,
      identifier: row.identifier,
      nameKo: row.name_ko,
      generation: row.generation,
      sortOrder: row.sort_order,
    }),
  );
}

// app/pages/(pokedex)/pokeKey/api/move.ts (기존 파일 끝에 추가)

// ─── 클라이언트용 헬퍼 ─────────────────────────────────────

/**
 * SWR fetcher용 URL builder.
 * 동일 URL이 SWR cache key 역할도 함.
 */
export const movesApiUrl = (pokeKey: string, vgId: number): string =>
  `/pokedex/${pokeKey}/api/move?vg=${vgId}`;

/**
 * SWR fetcher.
 * 에러 시 throw하면 SWR이 error 상태로 처리.
 */
export const movesFetcher = async (url: string): Promise<PokeMoveResult> => {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      `movesFetcher ${res.status}: ${body.message ?? res.statusText}`,
    );
  }
  return res.json();
};
