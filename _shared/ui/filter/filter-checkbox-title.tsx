import type { FilterCheckboxGroup } from './filter-group';

// 팝오버 제목: '타입 (최대 2개)'. 시트는 설명 줄로 따로 보인다. 안내는 작게 (/pokedex/national과 같다)
export function FilterCheckboxTitleText({
  group,
}: {
  group: Pick<FilterCheckboxGroup, 'title' | 'max'>;
}) {
  return (
    <span className="flex items-center gap-1">
      <span>{group.title}</span>
      {group.max !== undefined && (
        <span className="text-xs font-normal text-muted-foreground">
          (최대 {group.max}개)
        </span>
      )}
    </span>
  );
}
