interface FormFilterOption {
  identifier: string;
  label: string;
}

// 선택된 모습들로 트리거 문구를 만든다. 훅/URL에 의존하지 않는 순수 함수.
// - 선택 없음 → "모습: 모든 모습"
// - 선택 있음 → "모습: 라벨1, 라벨2" (선택 순서 보존, 알 수 없는 identifier는 무시)
export const getFormTriggerText = (
  selectedForms: string[],
  options: readonly FormFilterOption[],
): string => {
  const names = selectedForms
    .map(
      (identifier) =>
        options.find((option) => option.identifier === identifier)?.label,
    )
    .filter((label): label is string => Boolean(label));

  return names.length === 0 ? '모습: 모든 모습' : `모습: ${names.join(', ')}`;
};
