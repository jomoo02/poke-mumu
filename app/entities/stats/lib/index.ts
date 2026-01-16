const calculateStatValue = (
  baseStatValue: number,
  individualValue: number,
  effortValue: number,
  level: number,
  natureModifier: number,
) => {
  const stat =
    (baseStatValue * 2 + individualValue + effortValue / 4) * (level / 100) + 5;
  const natureModifierStat = Math.floor(stat) * natureModifier;

  return Math.floor(natureModifierStat);
};

const calculateHpStatValue = (
  hpBaseStatValue: number,
  individualValue: number,
  effortValue: number,
  level: number,
) => {
  return Math.floor(
    ((hpBaseStatValue * 2 + individualValue + effortValue / 4 + 100) * level) /
      100 +
      10,
  );
};

export const calculateMaxStatValue = (
  stat: string,
  value: number,
  level: number,
) => {
  if (stat === 'hp') {
    return calculateHpStatValue(value, 31, 252, level);
  }
  return calculateStatValue(value, 31, 252, level, 1.1);
};

export const calculateMinStatValue = (
  stat: string,
  value: number,
  level: number,
) => {
  if (stat === 'hp') {
    return calculateHpStatValue(value, 0, 0, level);
  }
  return calculateStatValue(value, 0, 0, level, 0.9);
};
