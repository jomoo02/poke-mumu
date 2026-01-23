export interface Move {
  id: number;
  accuracy: number | null;
  damage_class: string;
  description?: string;
  identifier: string;
  machine_number: number | null;
  machine_type: string | null;
  move_id: number;
  move_number?: number;
  name_en: string;
  name_ja: string;
  name_ko: string;
  power: number | null;
  pp: number | null;
  type: string;
  version_group_id: number;
}
