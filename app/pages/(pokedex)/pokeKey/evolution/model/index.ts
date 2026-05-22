export interface EvolutionCondition {
  key: string;
  value: string; // 항상 string. key 기준으로 호출부에서 파싱.
}

export interface EvolutionDetail {
  trigger: string; // 'level-up' | 'use-item' | 'trade' | ...
  display: string; // 표시용 완성된 문자열
  conditions: EvolutionCondition[];
}

export interface EvolutionNode {
  pokeKey: string;
  dexNumber: number;
  nameKo: string;
  formKo: string | null;
  sprite: string;
  details: EvolutionDetail[]; // 이 노드로 진화하기 위한 트리거(들). 루트는 보통 빈 배열.
  next: EvolutionNode[];
}

export interface EvolutionTree {
  id: number;
  roots: EvolutionNode[];
}

/** min_level 같은 수치 condition을 안전하게 number로 꺼낼 때 사용 */
export function parseConditionNumber(c: EvolutionCondition): number | null {
  const n = Number(c.value);
  return Number.isFinite(n) ? n : null;
}
