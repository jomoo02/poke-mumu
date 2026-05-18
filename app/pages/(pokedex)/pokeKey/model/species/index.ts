interface SpeciesView {
  generaKo: string;
  eggGroup1: string;
  eggGroup2: string | null;
  hatchCounter: number | null;
  genderRate: number;
  baseHappiness: number;
  growthRate: string;
  captureRate: number;
}

const GROWTH_RATE_LABEL: Record<string, string> = {
  slow: '항상 많음',
  'medium-slow': '초반 매우 적음, 후반 보통',
  medium: '항상 보통',
  fast: '항상 적음',
  'slow-then-very-fast': '초반 매우 많음, 후반 매우 적음',
  'fast-then-very-slow': '초반 매우 적음, 후반 매우 많음',
};

const formatGenderRatio = (genderRate: number | null) => {
  if (genderRate === null || genderRate === -1) {
    return null;
  }

  const female = genderRate * 12.5;
  const male = 100 - female;

  return {
    male: male === 0 ? null : male,
    female: female === 0 ? null : female,
  };
};

export { type SpeciesView, GROWTH_RATE_LABEL, formatGenderRatio };
