export const formatNumber = (dexNumber: number, maxLength: number = 4) =>
  `${dexNumber.toString().padStart(maxLength, '0')}`;

export const dmToMeters = (dm: number) => dm / 10;
export const hgToKilograms = (hg: number) => hg / 10;

export const formatHeight = (dm: number) => `${dmToMeters(dm).toFixed(1)} m`;
export const formatWeight = (hg: number) =>
  `${hgToKilograms(hg).toFixed(1)} kg`;
