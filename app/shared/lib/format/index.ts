export const formatNumber = (dexNumber: number, maxLength: number = 4) =>
  `${dexNumber.toString().padStart(maxLength, '0')}`;
