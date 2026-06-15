import { StatMeta, Stat, StatRow, STAT_IDENTIFIERS_ROW_MAP } from '../model';

// entities/stat/lib/to-stat-rows.ts
export const toStatRows = (values: Stat, meta: StatMeta[]): StatRow[] => {
  return meta // 이미 display_order로 정렬되어 옴
    .map((m) => ({
      identifier: m.identifier,
      label: m.nameKo, // 한글화 = DB가 보장
      value: values[STAT_IDENTIFIERS_ROW_MAP[m.identifier]],
    }));
};
