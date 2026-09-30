import type { ChangeLogField } from '../../_shared/pokemon/moveEnums';
import type { ZaVariant } from '../../_shared/pokemon/moveTarget';

/** move 테이블(master). champions 프리필 소스이자 편집기 헤더 표시용. */
export interface MoveMaster {
  id: number;
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  typeId: number;
  damageClassId: number | null;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  priority: number;
  effectChance: number | null;
  targetId: number | null;
  description: string | null;
  isContact: boolean | null;
  moveNumber: number | null;
}

/** move_change_log 행. PK는 대리키 id(신규행은 undefined). */
export interface ChangeLogRow {
  id?: number;
  moveId: number;
  versionGroupId: number;
  field: ChangeLogField;
  oldValue: string | null;
  newValue: string | null;
}

/** champions_move 행. version_group_id 없음. base_move_id 유니크(0~1행). */
export interface ChampionsMoveRow {
  id?: number;
  baseMoveId: number;
  identifier: string;
  nameKo: string | null;
  nameEn: string | null;
  nameJa: string | null;
  typeId: number | null;
  damageClassId: number | null;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  priority: number;
  effectChance: number | null;
  targetId: number | null;
  description: string | null;
}

/** champions_poke_move + poke 조인(표시용). */
export interface ChampionsPokeMoveRow {
  id: number;
  pokeKey: string;
  moveId: number;
  nameKo: string;
  nameEn: string;
  dexNumber: number;
  sprite: string | null;
}

/** 포켓몬 검색 결과. */
export interface PokeSearchResult {
  pokeKey: string;
  nameKo: string;
  nameEn: string;
  dexNumber: number;
  sprite: string | null;
  formLabel: string | null;
}

/** version_move 밀집저장 참조(읽기전용, §5.1). */
export interface VersionMoveRefRow {
  versionGroupId: number;
  nameKo: string;
  typeId: number;
  damageClassId: number | null;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  priority: number | null;
  effectChance: number | null;
  targetId: number | null;
  isUsable: boolean;
}

/** standard / agile / strong 3열 매트릭스(LA). */
export interface LaTriple {
  standard: number | null;
  agile: number | null;
  strong: number | null;
}

/** version_move_legends_arceus 행. base_move_id 유니크 아님(존재확인 분기). */
export interface LegendsArceusRow {
  id?: number;
  baseMoveId: number;
  identifier: string;
  nameKo: string | null;
  nameEn: string | null;
  nameJa: string | null;
  typeId: number | null;
  damageClassId: number | null;
  pp: number | null;
  description: string | null;
  power: LaTriple;
  accuracy: LaTriple;
  actionSpeedSelf: LaTriple;
  actionSpeedTarget: LaTriple;
  effectChance: LaTriple;
  effectTurns: LaTriple;
  effectNote: string | null;
  effectRecoil: LaTriple;
  effectHeal: LaTriple;
}

/** version_move_legends_za 행(변형별). (base_move_id, za_variant) 존재확인 분기. */
export interface LegendsZaRow {
  id?: number;
  zaVariant: ZaVariant;
  baseMoveId: number;
  /** move.move_number + {base:0,plus:1000,rogue:2000}. 삽입 시 자동 계산. */
  legacyMoveId: number;
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  description: string;
  typeId: number;
  damageClassId: number;
  power: number | null;
  cooldown: number | null;
  pp: number | null;
  duration: number | null;
  framesWindUp: number | null;
  framesExec: number | null;
  rangeMin: number | null;
  rangeMax: number | null;
  rangeEff: number | null;
  machineType: string | null;
  machineNumber: number | null;
  versionGroupId: number;
  effectChance: number | null;
  effectRecoil: number | null;
  effectHeal: number | null;
}

/** 편집기 뷰모델(5.1~5.6 전체). */
export interface MoveEditorView {
  master: MoveMaster;
  changeLogs: ChangeLogRow[];
  versionMoves: VersionMoveRefRow[];
  legendsArceus: LegendsArceusRow | null;
  legendsZa: LegendsZaRow[];
  champions: ChampionsMoveRow | null;
  championsPokeMoves: ChampionsPokeMoveRow[];
}
