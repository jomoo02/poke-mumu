import type { Ability } from '@/entities/ability/model';

export interface AbilityGenerationGroup {
  gen: number;
  /** 섹션 `aria-labelledby`가 가리키는 세대 헤더 id */
  headingId: string;
  abilities: Ability[];
}

export interface GenerationChip {
  /** null = 전체 */
  gen: number | null;
  /** 검색 결과 기준 개수. 0이면 비활성 */
  count: number;
}

/** 칩·헤더 표시 이름. null은 '전체'. */
export function getGenerationLabel(gen: number | null): string {
  return gen === null ? '전체' : `${gen}세대`;
}

export function getGenerationHeadingId(gen: number): string {
  return `ability-gen-${gen}-heading`;
}

/** 데이터에 실제로 존재하는 세대 목록(오름차순). 검색과 무관하게 칩 구성을 고정하는 데 쓴다. */
export function getAvailableGenerations(abilities: Ability[]): number[] {
  return Array.from(new Set(abilities.map(({ gen }) => gen))).sort(
    (a, b) => a - b,
  );
}

/**
 * 이미 정렬된 목록을 세대별로 묶는다. 그룹 안의 순서는 입력 순서를 그대로 유지한다.
 * 그룹 순서는 세대 오름차순. 항목이 없는 세대는 만들지 않는다.
 */
export function groupAbilitiesByGeneration(
  abilities: Ability[],
): AbilityGenerationGroup[] {
  const buckets = new Map<number, Ability[]>();

  for (const ability of abilities) {
    const bucket = buckets.get(ability.gen);

    if (bucket) {
      bucket.push(ability);
    } else {
      buckets.set(ability.gen, [ability]);
    }
  }

  return Array.from(buckets.keys())
    .sort((a, b) => a - b)
    .map((gen) => ({
      gen,
      headingId: getGenerationHeadingId(gen),
      abilities: buckets.get(gen) ?? [],
    }));
}

/** 세대 칩 목록. 맨 앞 '전체' + 데이터에 존재하는 세대 전부(검색 결과 0개여도 포함). */
export function buildGenerationChips(
  generations: number[],
  groups: AbilityGenerationGroup[],
): GenerationChip[] {
  const countByGen = new Map<number, number>(
    groups.map((group) => [group.gen, group.abilities.length]),
  );

  const total = groups.reduce(
    (sum, group) => sum + group.abilities.length,
    0,
  );

  return [
    { gen: null, count: total },
    ...generations.map((gen) => ({ gen, count: countByGen.get(gen) ?? 0 })),
  ];
}
