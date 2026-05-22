const LOCATION_NAMES_KO: Record<string, string> = {
  'mossy-rock': '이끼 낀 바위',
  'icy-rock': '얼음 바위',
  'magnetic-field': '자기장 영역',
  'mount-lanakila': '라나키라마운틴',
};

export function getLocationNameKo(key: string): string {
  return LOCATION_NAMES_KO[key] ?? key;
}
