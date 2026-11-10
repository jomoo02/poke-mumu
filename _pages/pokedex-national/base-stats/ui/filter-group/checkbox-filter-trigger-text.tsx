import type { CheckboxFilterState } from './use-checkbox-filter';

interface CheckboxFilterTriggerTextProps {
  filter: Pick<CheckboxFilterState, 'triggerText' | 'triggerRest'>;
}

// 트리거 안 글자: '모습: 알로라의 모습' + '+2'. 접근 이름은 트리거의 aria-label이 대신해 숨긴다.
// 이름이 길면 이름만 말줄임하고 '+N'은 남긴다
export default function CheckboxFilterTriggerText({
  filter,
}: CheckboxFilterTriggerTextProps) {
  return (
    <span aria-hidden className="flex min-w-0 items-center gap-1.5">
      <span className="truncate">{filter.triggerText}</span>
      {filter.triggerRest > 0 && (
        <span className="shrink-0 tabular-nums">+{filter.triggerRest}</span>
      )}
    </span>
  );
}
