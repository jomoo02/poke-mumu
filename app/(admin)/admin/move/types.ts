// ── 포켓몬 검색 결과 ──

export type AdminPokeResult = {
  pokeKey: string;
  nameKo: string;
  nameEn: string;
  dexNumber: number;
  sprite: string;
  formNameKo: string | null;
};
// ── 룩업 데이터 (서버에서 한 번만 fetch) ──

export type AdminVersionGroup = {
  id: number;
  identifier: string;
  nameKo: string;
  generation: number;
};

export type AdminLearnMethod = {
  id: number;
  identifier: string;
  nameKo: string;
};

// ── 기술 검색 결과 (추가 폼용) ──

export type AdminMoveResult = {
  id: number;
  identifier: string;
  nameKo: string;
  typeIdentifier: string;
  typeNameKo: string;
};

// ── 현재 기술 목록 (조회용, join된 결과) ──

export type AdminPokeMove = {
  id: number;
  moveId: number;
  moveIdentifier: string;
  moveNameKo: string;
  learnMethodId: number;
  learnMethodIdentifier: string;
  learnMethodNameKo: string;
  level: number | null;
  detail: string | null;
  // version_move에서 가져온 정보
  typeIdentifier: string | null;
  typeNameKo: string | null;
  damageClassIdentifier: string | null;
  damageClassNameKo: string | null;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
};

// ── 쓰기 액션 입력 ──

export type AddPokeMoveInput = {
  pokeKey: string;
  versionGroupId: number;
  moveId: number;
  learnMethodId: number;
  level: number | null;
};

export type UpdatePokeMoveInput = {
  id: number;
  learnMethodId: number;
  level: number | null;
};

// ── 아래 내용을 types.ts 맨 아래에 추가 ──

export type ParsedCsvRow = {
  line: number;
  raw: string;
  moveIdentifier: string;
  learnMethodId: number;
  level: number | null;
  // DB 조회 결과
  moveId: number | null;
  moveNameKo: string | null;
  typeNameKo: string | null;
  // 검증 상태
  status:
    | 'ok'
    | 'not-found'
    | 'not-in-version'
    | 'invalid-level'
    | 'parse-error';
  error?: string;
};
