const MULTIPLIERS = [0, 0.25, 0.5, 1, 2, 4] as const;

type Multiplier = (typeof MULTIPLIERS)[number];

interface TypeEffectiveness {
  attackerTypeId: number;
  multiplier: Multiplier;
}

// DB numeric 곱셈 오차(예: 4배가 3.9999999999999999)를 가장 가까운 배율로 보정
const toMultiplier = (value: number): Multiplier =>
  MULTIPLIERS.reduce((closest, multiplier) =>
    Math.abs(multiplier - value) < Math.abs(closest - value)
      ? multiplier
      : closest,
  );

// 표시 순서: 약점(큰 배율) → 반감 → 무효. 1배는 제외
const DISPLAY_ORDER = [
  4, 2, 0.5, 0.25, 0,
] as const satisfies readonly Multiplier[];

interface EffectivenessGroup {
  multiplier: Multiplier;
  attackerTypeIds: number[];
}

// 배율별로 공격 타입 id를 묶고, 해당 타입이 없는 배율은 뺀다
const groupByMultiplier = (
  effectiveness: TypeEffectiveness[],
): EffectivenessGroup[] =>
  DISPLAY_ORDER.map((multiplier) => ({
    multiplier,
    attackerTypeIds: effectiveness
      .filter((entry) => entry.multiplier === multiplier)
      .map((entry) => entry.attackerTypeId),
  })).filter((group) => group.attackerTypeIds.length > 0);

export type { Multiplier, TypeEffectiveness, EffectivenessGroup };

export { MULTIPLIERS, toMultiplier, groupByMultiplier };
