import type { MoveFilterGroup, MoveFilterOption } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import {
  MOVE_FILTER_GROUP_TITLE,
  useFilterOptions,
  useFilterParam,
} from '../../model/filter';
import { FilterTile, FilterTileGrid } from './filter-tile';
import { DamageClassIcon } from '@/_entities/damage-class';
import { TypeIcon } from '@/_entities/type';

interface FilterOptionListProps {
  group: MoveFilterGroup;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 타일 묶음에 붙는다 (줄 수 grid-cols-N 등)
  className?: string;
}

// 그룹 하나의 선택지 타일 [아이콘 / 이름]. 고르는 즉시 반영, 고르면 나올 기술이 없으면 흐리게 (고를 수는 있다)
export default function FilterOptionList({
  group,
  filterCounts,
  className,
}: FilterOptionListProps) {
  const options = useFilterOptions();
  const { filter, toggleFilter } = useFilterParam();

  const isEmpty = (value: string) => (filterCounts[group][value] ?? 0) === 0;

  return (
    <FilterTileGrid
      aria-label={MOVE_FILTER_GROUP_TITLE[group]}
      className={className}
    >
      {options[group].map((option) => (
        <FilterTile
          key={option.value}
          pressed={filter[group].includes(option.value)}
          onPressedChange={() => toggleFilter(group, option.value)}
          label={option.label}
          icon={<OptionIcon option={option} />}
          empty={isEmpty(option.value)}
        />
      ))}
    </FilterTileGrid>
  );
}

// 선택지 아이콘 (타입 또는 분류, 28px). 없으면 null
function OptionIcon({ option }: { option: MoveFilterOption }) {
  if (option.type) {
    return <TypeIcon type={option.type} decorative />;
  }

  if (option.damageClass) {
    return <DamageClassIcon damageClass={option.damageClass} decorative />;
  }

  return null;
}
