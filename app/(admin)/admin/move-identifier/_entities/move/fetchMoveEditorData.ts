import { notFound } from 'next/navigation';
import { createAnonClient } from '../../_shared/supabase/anonClient';
import {
  adaptChampionsMove,
  adaptChampionsPokeMove,
  adaptChangeLog,
  adaptLegendsArceus,
  adaptLegendsZa,
  adaptMaster,
  adaptVersionMove,
  type ChampionsMoveDbRow,
  type ChampionsPokeMoveDbRow,
  type ChangeLogDbRow,
  type LegendsArceusDbRow,
  type LegendsZaDbRow,
  type MoveDbRow,
  type VersionMoveDbRow,
} from './adapter';
import type { MoveEditorView } from './types';

/**
 * identifier로 편집기 뷰모델을 로드한다(5.1~5.6 전체).
 * master 없으면 notFound(). 읽기는 anon(public SELECT) 클라이언트 사용.
 */
export async function fetchMoveEditorData(
  identifier: string,
): Promise<MoveEditorView> {
  const supabase = createAnonClient();

  const { data: masterRow, error: masterError } = await supabase
    .from('move')
    .select(
      'id, identifier, name_ko, name_en, name_ja, type_id, damage_class_id, power, pp, accuracy, priority, effect_chance, target_id, description, is_contact, legacy_id',
    )
    .eq('identifier', identifier)
    .maybeSingle();

  if (masterError) {
    throw new Error(`move 로드 실패: ${masterError.message}`);
  }
  if (!masterRow) {
    notFound();
  }

  const master = adaptMaster(masterRow as unknown as MoveDbRow);

  const [changeLogRes, versionMoveRes, laRes, zaRes, championsRes, pokeMoveRes] =
    await Promise.all([
      supabase
        .from('move_change_log')
        .select('id, move_id, version_group_id, field, old_value, new_value')
        .eq('move_id', master.id)
        .order('version_group_id', { ascending: true })
        .order('field', { ascending: true }),
      supabase
        .from('version_move')
        .select(
          'version_group_id, name_ko, type_id, damage_class_id, power, pp, accuracy, priority, effect_chance, target_id, is_usable',
        )
        .eq('move_id', master.id)
        .order('version_group_id', { ascending: true }),
      supabase
        .from('version_move_legends_arceus')
        .select('*')
        .eq('base_move_id', master.id)
        .maybeSingle(),
      supabase
        .from('version_move_legends_za')
        .select('*')
        .eq('base_move_id', master.id),
      supabase
        .from('champions_move')
        .select(
          'id, base_move_id, identifier, name_ko, name_en, name_ja, type_id, damage_class_id, power, pp, accuracy, priority, effect_chance, target_id, description',
        )
        .eq('base_move_id', master.id)
        .maybeSingle(),
      supabase
        .from('champions_poke_move')
        .select('id, poke_key, move_id, poke(name_ko, name_en, dex_number, sprite)')
        .eq('move_id', master.id)
        .order('poke_key', { ascending: true }),
    ]);

  for (const [label, res] of [
    ['move_change_log', changeLogRes],
    ['version_move', versionMoveRes],
    ['version_move_legends_arceus', laRes],
    ['version_move_legends_za', zaRes],
    ['champions_move', championsRes],
    ['champions_poke_move', pokeMoveRes],
  ] as const) {
    if (res.error) {
      throw new Error(`${label} 로드 실패: ${res.error.message}`);
    }
  }

  const changeLogs = ((changeLogRes.data ?? []) as unknown as ChangeLogDbRow[]).map(
    adaptChangeLog,
  );
  const versionMoves = (
    (versionMoveRes.data ?? []) as unknown as VersionMoveDbRow[]
  ).map(adaptVersionMove);
  const legendsArceus = laRes.data
    ? adaptLegendsArceus(laRes.data as unknown as LegendsArceusDbRow)
    : null;
  const legendsZa = ((zaRes.data ?? []) as unknown as LegendsZaDbRow[])
    .map(adaptLegendsZa)
    .sort((a, b) => a.zaVariant.localeCompare(b.zaVariant));
  const champions = championsRes.data
    ? adaptChampionsMove(championsRes.data as unknown as ChampionsMoveDbRow)
    : null;
  const championsPokeMoves = (
    (pokeMoveRes.data ?? []) as unknown as ChampionsPokeMoveDbRow[]
  )
    .map(adaptChampionsPokeMove)
    .sort((a, b) => a.dexNumber - b.dexNumber);

  return {
    master,
    changeLogs,
    versionMoves,
    legendsArceus,
    legendsZa,
    champions,
    championsPokeMoves,
  };
}
