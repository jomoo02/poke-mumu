'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/app/shared/lib/supabase/client';

import type {
  AdminPokeResult,
  AdminVersionGroup,
  AdminLearnMethod,
  AdminMoveResult,
  AdminPokeMove,
  AddPokeMoveInput,
  UpdatePokeMoveInput,
  ParsedCsvRow,
} from './types';

// ─────────────────────────────────────────────
// 조회 액션
// ─────────────────────────────────────────────

/** 포켓몬 검색 (poke_key, name 매칭) */
export async function searchPokemon(query: string): Promise<AdminPokeResult[]> {
  if (!query || query.length < 1) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from('poke')
    .select(
      'poke_key, name_ko, name_en, sprite, species:species_id(dex_number), form:form_id(name_ko)',
    )
    .or(
      `poke_key.ilike.%${query}%,name_ko.ilike.%${query}%,name_en.ilike.%${query}%`,
    )
    .order('sort_order')
    .limit(20);

  if (error) throw new Error(`searchPokemon: ${error.message}`);

  type Row = {
    poke_key: string;
    name_ko: string;
    name_en: string;
    sprite: string;
    species: { dex_number: number } | null;
    form: { name_ko: string } | null;
  };

  return ((data as Row[]) ?? []).map((row) => ({
    pokeKey: row.poke_key,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    dexNumber: row.species?.dex_number ?? 0,
    sprite: row.sprite,
    formNameKo: row.form?.name_ko ?? null,
  }));
}
/** 버전 그룹 전체 목록 */
export async function getVersionGroups(): Promise<AdminVersionGroup[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('version_group')
    .select('id, identifier, name_ko, generation')
    .order('id');

  if (error) throw new Error(`getVersionGroups: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id as number,
    identifier: row.identifier as string,
    nameKo: row.name_ko as string,
    generation: row.generation as number,
  }));
}

/** 학습 방법 전체 목록 */
export async function getLearnMethods(): Promise<AdminLearnMethod[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('move_learn_method')
    .select('id, identifier, name_ko')
    .order('id');

  if (error) throw new Error(`getLearnMethods: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id as number,
    identifier: row.identifier as string,
    nameKo: row.name_ko as string,
  }));
}

/** 기술 검색 (추가 폼용) */
/** 기술 검색 (선택된 버전에 존재하는 기술만) */
export async function searchMoves(
  query: string,
  vgId: number,
): Promise<AdminMoveResult[]> {
  if (!query || query.length < 1) return [];

  const supabase = createClient();

  // version_move에 존재하는 move_id 목록 먼저 가져오기
  const { data: vmIds, error: vmError } = await supabase
    .from('version_move')
    .select('move_id')
    .eq('version_group_id', vgId);

  if (vmError) throw new Error(`searchMoves(vm): ${vmError.message}`);

  const validMoveIds = (vmIds ?? []).map((r) => r.move_id as number);
  if (validMoveIds.length === 0) return [];

  const { data, error } = await supabase
    .from('move')
    .select('id, identifier, name_ko, type:type_id(identifier, name_ko)')
    .ilike('name_ko', `%${query}%`)
    .in('id', validMoveIds)
    .order('id')
    .limit(20);

  if (error) throw new Error(`searchMoves: ${error.message}`);

  type MoveRow = {
    id: number;
    identifier: string;
    name_ko: string;
    type: { identifier: string; name_ko: string } | null;
  };

  return ((data as MoveRow[]) ?? []).map((row) => ({
    id: row.id,
    identifier: row.identifier,
    nameKo: row.name_ko,
    typeIdentifier: row.type?.identifier ?? '',
    typeNameKo: row.type?.name_ko ?? '',
  }));
}

/** 특정 포켓몬 + 버전의 현재 기술 목록 */
export async function getPokeMovesForVg(
  pokeKey: string,
  vgId: number,
): Promise<AdminPokeMove[]> {
  const supabase = createClient();

  // 1) poke_move + move + learn_method join
  const { data: pokeMoves, error: pmError } = await supabase
    .from('poke_move')
    .select(
      `
      id,
      move_id,
      learn_method_id,
      level,
      detail,
      move!inner(id, identifier, name_ko),
      move_learn_method!inner(identifier, name_ko)
    `,
    )
    .eq('poke_key', pokeKey)
    .eq('version_group_id', vgId)
    .order('learn_method_id')
    .order('level', { nullsFirst: false });

  if (pmError) throw new Error(`getPokeMovesForVg(pm): ${pmError.message}`);
  if (!pokeMoves || pokeMoves.length === 0) return [];

  // 2) version_move에서 type/power 정보 가져오기
  const moveIds = [...new Set(pokeMoves.map((pm) => pm.move_id as number))];
  const { data: versionMoves, error: vmError } = await supabase
    .from('version_move')
    .select(
      `
      move_id,
      power,
      pp,
      accuracy,
      type:type_id(identifier, name_ko),
      damage_class:damage_class_id(identifier, name_ko)
    `,
    )
    .eq('version_group_id', vgId)
    .in('move_id', moveIds);

  if (vmError) throw new Error(`getPokeMovesForVg(vm): ${vmError.message}`);

  type VmRow = {
    move_id: number;
    power: number | null;
    pp: number | null;
    accuracy: number | null;
    type: { identifier: string; name_ko: string } | null;
    damage_class: { identifier: string; name_ko: string } | null;
  };

  const vmMap = new Map<number, VmRow>();
  for (const vm of (versionMoves as VmRow[]) ?? []) {
    vmMap.set(vm.move_id, vm);
  }

  // 3) 병합
  type PmRow = {
    id: number;
    move_id: number;
    learn_method_id: number;
    level: number | null;
    detail: string | null;
    move: { id: number; identifier: string; name_ko: string };
    move_learn_method: { identifier: string; name_ko: string };
  };

  return ((pokeMoves as PmRow[]) ?? []).map((pm) => {
    const vm = vmMap.get(pm.move_id);
    return {
      id: pm.id,
      moveId: pm.move_id,
      moveIdentifier: pm.move.identifier,
      moveNameKo: pm.move.name_ko,
      learnMethodId: pm.learn_method_id,
      learnMethodIdentifier: pm.move_learn_method.identifier,
      learnMethodNameKo: pm.move_learn_method.name_ko,
      level: pm.level,
      detail: pm.detail,
      typeIdentifier: vm?.type?.identifier ?? null,
      typeNameKo: vm?.type?.name_ko ?? null,
      damageClassIdentifier: vm?.damage_class?.identifier ?? null,
      damageClassNameKo: vm?.damage_class?.name_ko ?? null,
      power: vm?.power ?? null,
      pp: vm?.pp ?? null,
      accuracy: vm?.accuracy ?? null,
    };
  });
}

// ─────────────────────────────────────────────
// 쓰기 액션
// ─────────────────────────────────────────────

/** 기술 추가 (단건 또는 배치) */
export async function addPokeMoves(
  inputs: AddPokeMoveInput[],
): Promise<{ success: boolean; count: number; error?: string }> {
  if (inputs.length === 0)
    return { success: false, count: 0, error: '추가할 데이터 없음' };

  // check constraint 사전 검증
  for (const input of inputs) {
    if (input.learnMethodId === 1 && input.level == null) {
      return {
        success: false,
        count: 0,
        error: '레벨업 기술은 레벨이 필수입니다',
      };
    }
    if (input.learnMethodId !== 1 && input.level != null) {
      return {
        success: false,
        count: 0,
        error: '레벨업 외 학습방법은 레벨을 비워야 합니다',
      };
    }
  }

  const supabase = createClient();
  const rows = inputs.map((input) => ({
    poke_key: input.pokeKey,
    version_group_id: input.versionGroupId,
    move_id: input.moveId,
    learn_method_id: input.learnMethodId,
    level: input.level,
  }));

  const { error } = await supabase.from('poke_move').insert(rows);

  if (error) return { success: false, count: 0, error: error.message };
  return { success: true, count: rows.length };
}
/** 선택 삭제 (id 배열) */
export async function deletePokeMovesById(
  ids: number[],
): Promise<{ success: boolean; count: number; error?: string }> {
  if (ids.length === 0)
    return { success: false, count: 0, error: '삭제할 ID 없음' };

  const supabase = createClient();
  const { error } = await supabase.from('poke_move').delete().in('id', ids);

  if (error) return { success: false, count: 0, error: error.message };
  return { success: true, count: ids.length };
}

/** 특정 포켓몬 + 버전의 기술 전체 삭제 */
export async function deletePokeMovesByVg(
  pokeKey: string,
  vgId: number,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error, count } = await supabase
    .from('poke_move')
    .delete({ count: 'exact' })
    .eq('poke_key', pokeKey)
    .eq('version_group_id', vgId);

  if (error) return { success: false, error: error.message };
  return { success: true, error: undefined };
}

/** 단건 수정 (learn_method, level) */
export async function updatePokeMove(
  input: UpdatePokeMoveInput,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from('poke_move')
    .update({
      learn_method_id: input.learnMethodId,
      level: input.level,
    })
    .eq('id', input.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

// ── 아래 내용을 actions.ts 맨 아래에 추가 ──
// import에 ParsedCsvRow 추가 필요

/**
 * CSV 텍스트를 파싱하고 검증.
 *
 * 포맷: move_identifier,learn_method_id,level
 * - move_identifier: identifier 또는 name_ko 둘 다 지원
 * - learn_method_id: 숫자
 * - level: 숫자 또는 비어있음
 *
 * 예시:
 * thunderbolt,4,
 * iron-tail,1,25
 * 10만볼트,4,
 */
export async function parseCsvMoves(
  csv: string,
  vgId: number,
): Promise<ParsedCsvRow[]> {
  const lines = csv
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  // 헤더 행 스킵 (move로 시작하면)
  const startIdx =
    lines[0].toLowerCase().startsWith('move') || lines[0].startsWith('기술')
      ? 1
      : 0;

  // 1) 파싱
  type RawRow = {
    line: number;
    raw: string;
    moveKey: string;
    learnMethodId: number;
    level: number | null;
  };

  const rawRows: RawRow[] = [];
  const parseErrors: ParsedCsvRow[] = [];

  for (let i = startIdx; i < lines.length; i++) {
    const raw = lines[i];
    const parts = raw.split(',').map((p) => p.trim());

    if (parts.length < 2) {
      parseErrors.push({
        line: i + 1,
        raw,
        moveIdentifier: parts[0] ?? '',
        learnMethodId: 0,
        level: null,
        moveId: null,
        moveNameKo: null,
        typeNameKo: null,
        status: 'parse-error',
        error: '최소 2개 필드 필요 (기술,학습방법)',
      });
      continue;
    }

    const moveKey = parts[0];
    const methodId = Number(parts[1]);
    const levelStr = parts[2] ?? '';
    const level = levelStr === '' ? null : Number(levelStr);

    if (!moveKey) {
      parseErrors.push({
        line: i + 1,
        raw,
        moveIdentifier: '',
        learnMethodId: methodId,
        level,
        moveId: null,
        moveNameKo: null,
        typeNameKo: null,
        status: 'parse-error',
        error: '기술명이 비어있음',
      });
      continue;
    }

    if (!Number.isFinite(methodId) || methodId <= 0) {
      parseErrors.push({
        line: i + 1,
        raw,
        moveIdentifier: moveKey,
        learnMethodId: 0,
        level,
        moveId: null,
        moveNameKo: null,
        typeNameKo: null,
        status: 'parse-error',
        error: `잘못된 learn_method_id: ${parts[1]}`,
      });
      continue;
    }

    if (
      levelStr !== '' &&
      (!Number.isFinite(level) || (level != null && level < 0))
    ) {
      parseErrors.push({
        line: i + 1,
        raw,
        moveIdentifier: moveKey,
        learnMethodId: methodId,
        level: null,
        moveId: null,
        moveNameKo: null,
        typeNameKo: null,
        status: 'parse-error',
        error: `잘못된 level: ${levelStr}`,
      });
      continue;
    }

    rawRows.push({ line: i + 1, raw, moveKey, learnMethodId: methodId, level });
  }

  if (rawRows.length === 0) return parseErrors;

  // 2) move 테이블에서 identifier + name_ko 일괄 조회
  const supabase = createClient();
  const moveKeys = [...new Set(rawRows.map((r) => r.moveKey))];

  const { data: movesByIdentifier } = await supabase
    .from('move')
    .select('id, identifier, name_ko, type:type_id(name_ko)')
    .in('identifier', moveKeys);

  const { data: movesByName } = await supabase
    .from('move')
    .select('id, identifier, name_ko, type:type_id(name_ko)')
    .in('name_ko', moveKeys);

  type MoveHit = {
    id: number;
    identifier: string;
    name_ko: string;
    type: { name_ko: string } | null;
  };

  // identifier → move, name_ko → move 맵 구축
  const byIdentifier = new Map<string, MoveHit>();
  for (const m of (movesByIdentifier as MoveHit[]) ?? []) {
    byIdentifier.set(m.identifier, m);
  }
  const byName = new Map<string, MoveHit>();
  for (const m of (movesByName as MoveHit[]) ?? []) {
    byName.set(m.name_ko, m);
  }

  // 3) version_move에서 이 버전에 존재하는 move_id 셋
  const { data: vmData } = await supabase
    .from('version_move')
    .select('move_id')
    .eq('version_group_id', vgId);

  const versionMoveIds = new Set(
    (vmData ?? []).map((r) => r.move_id as number),
  );

  // 4) 각 행 검증
  const results: ParsedCsvRow[] = [...parseErrors];

  for (const row of rawRows) {
    const move = byIdentifier.get(row.moveKey) ?? byName.get(row.moveKey);

    const base = {
      line: row.line,
      raw: row.raw,
      moveIdentifier: move?.identifier ?? row.moveKey,
      learnMethodId: row.learnMethodId,
      level: row.level,
    };

    // move 존재 확인
    if (!move) {
      results.push({
        ...base,
        moveId: null,
        moveNameKo: null,
        typeNameKo: null,
        status: 'not-found',
        error: `기술 "${row.moveKey}" 찾을 수 없음`,
      });
      continue;
    }

    // 버전 존재 확인
    if (!versionMoveIds.has(move.id)) {
      results.push({
        ...base,
        moveId: move.id,
        moveNameKo: move.name_ko,
        typeNameKo: move.type?.name_ko ?? null,
        status: 'not-in-version',
        error: `이 버전에 존재하지 않는 기술`,
      });
      continue;
    }

    // check constraint 검증
    if (row.learnMethodId === 1 && row.level == null) {
      results.push({
        ...base,
        moveId: move.id,
        moveNameKo: move.name_ko,
        typeNameKo: move.type?.name_ko ?? null,
        status: 'invalid-level',
        error: '레벨업은 level 필수',
      });
      continue;
    }
    if (row.learnMethodId !== 1 && row.level != null) {
      results.push({
        ...base,
        moveId: move.id,
        moveNameKo: move.name_ko,
        typeNameKo: move.type?.name_ko ?? null,
        status: 'invalid-level',
        error: '레벨업 외에는 level 비워야 함',
      });
      continue;
    }

    // OK
    results.push({
      ...base,
      moveId: move.id,
      moveNameKo: move.name_ko,
      typeNameKo: move.type?.name_ko ?? null,
      status: 'ok',
    });
  }

  // line 순으로 정렬
  results.sort((a, b) => a.line - b.line);
  return results;
}
