/**
 * 일반 vm 기준 학습 정보 (vg ≠ 22).
 * source: poke_move_vm_view
 */
// api/move.ts에 정의 (이미 있다면 컬럼 확인)

// app/pages/(pokedex)/pokeKey/api/move.ts (또는 별도 types 파일)

// 공통 인터페이스 — useMoveTable / useMoveFacets가 요구
export interface PokeMoveCommon {
  move_id: number;
  identifier: string;
  name_ko: string | null;
  power: number | null;
  type_identifier: string;
  type_name_ko: string;
  learn_method_identifier: string;
  learn_method_name_ko: string;
}

// 기존 PokeMoveVm은 PokeMoveCommon을 extends
export interface PokeMoveVm extends PokeMoveCommon {
  // ... 기존 컬럼들
  pp: number | null;
  accuracy: number | null;
  damage_class_identifier: 'physical' | 'special' | 'status' | null;
  damage_class_id: number | null;
  level: number | null;
  machine_type: string | null;
  machine_number: number | null;
  description: string | null;
  // ...
}

// 새 PokeMoveZa
export interface PokeMoveZa extends PokeMoveCommon {
  poke_key: string;
  version_group_id: 22;

  // 기본 정보
  damage_class_identifier: 'physical' | 'special' | 'status' | null;
  damage_class_id: number | null;
  description: string | null;
  generation: number;

  // ZA 전용
  za_id: number;
  legacy_move_id: number;
  za_variant: 'base' | 'plus' | 'rogue';
  base_move_id: number | null;
  cooldown: number | null;
  duration: number | null;
  frames_wind_up: number | null;
  frames_exec: number | null;
  range_min: number | null;
  range_max: number | null;
  range_eff: number | null;

  // 학습 (vm과 동일)
  level: number | null;
  detail: string | null;
  machine_type: string | null;
  machine_number: number | null;
}
// export interface PokeMoveVm {
//   poke_key: string;
//   version_group_id: number;
//   move_id: number;
//   identifier: string;
//   generation: number;
//   name_ko: string | null;
//   description: string | null;
//   power: number | null;
//   pp: number | null;
//   accuracy: number | null;
//   machine_type: string | null;
//   machine_number: number | null;
//   type_id: number;
//   type_identifier: string;
//   type_name_ko: string;
//   damage_class_id: number | null;
//   damage_class_identifier: 'physical' | 'special' | 'status' | null;
//   learn_method_id: number;
//   learn_method_identifier:
//     | 'level-up'
//     | 'machine'
//     | 'tutor'
//     | 'egg'
//     | 'evolution'
//     | 'pre-evolution'
//     | 'reminder'
//     | 'form-change'
//     | 'special';
//   learn_method_name_ko: string;
//   level: number | null;
//   detail: string | null;
// }

/**
 * ZA 학습 정보 (vg = 22).
 * source: poke_move_za_view
 *
 * 주의:
 * - poke_move는 base 학습만 담음 → 모든 행이 za_variant='base'
 * - plus/rogue는 /move/[identifier] detail 페이지에서 별도 노출
 */
// export interface PokeMoveZa {
//   poke_key: string;
//   version_group_id: 22;
//   level: number | null;
//   detail: string | null;

//   move_id: number;
//   za_id: number;
//   legacy_move_id: number;
//   za_variant: 'base';
//   identifier: string;
//   generation: number;

//   name_ko: string;
//   description: string;
//   power: number | null;
//   pp: number | null;

//   // ZA 전용 차원
//   cooldown: number | null;
//   duration: number | null;
//   frames_wind_up: number | null;
//   frames_exec: number | null;
//   range_min: number | null;
//   range_max: number | null;
//   range_eff: number | null;

//   machine_type: 'TM' | 'HM' | 'TR' | null;
//   machine_number: number | null;

//   type_id: number;
//   type_identifier: string;
//   type_name_ko: string;

//   damage_class_id: number;
//   damage_class_identifier: 'physical' | 'special' | 'status';

//   learn_method_id: number;
//   learn_method_identifier: string;
//   learn_method_name_ko: string;
// }

/**
 * vg에 따라 분기되는 결과 타입.
 * UI에서 kind로 분기해 다른 컴포넌트 렌더.
 */
export type PokeMoveResult =
  | { kind: 'vm'; vg_id: number; moves: PokeMoveVm[] }
  | { kind: 'za'; vg_id: 22; moves: PokeMoveZa[] };
