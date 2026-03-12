import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select';
import { SortKey, getSortOptions } from '../../model';

interface SelectSortkeyProps {
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
}

export default function SelectSortKey({
  sortKey,
  setSortKey,
}: SelectSortkeyProps) {
  const sortOptions = getSortOptions();

  return (
    <Select value={sortKey} onValueChange={setSortKey}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
