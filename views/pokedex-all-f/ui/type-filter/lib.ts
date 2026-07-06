interface TypeOption {
  identifier: string;
  nameKo: string;
}

// 선택된 타입들로 트리거 문구를 만든다. 훅/URL에 의존하지 않는 순수 함수.
// - 선택 없음 → "타입: 모든 타입"
// - 선택 있음 → "타입: 라벨1, 라벨2" (선택 순서 보존, 알 수 없는 identifier는 무시)
export const getTypeTriggerText = (
  selectedTypes: string[],
  types: readonly TypeOption[],
): string => {
  const names = selectedTypes
    .map(
      (identifier) =>
        types.find((type) => type.identifier === identifier)?.nameKo,
    )
    .filter((nameKo): nameKo is string => Boolean(nameKo));

  return names.length === 0 ? '타입: 모든 타입' : `타입: ${names.join(', ')}`;
};

// 선택 개수가 상한(max)에 도달했는지. 도달 시 미선택 항목은 disabled 처리한다.
export const isTypeSelectionFull = (
  selectedTypes: string[],
  max: number,
): boolean => selectedTypes.length >= max;
