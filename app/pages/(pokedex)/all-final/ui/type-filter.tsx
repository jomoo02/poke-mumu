import { Type } from '@/app/entities/type/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select';

interface TypeFilterProps {
  types: Type[];
  onChangeType: (v: string) => void;
  selectedType: string;
}

export default function TypeFilter({
  types,
  onChangeType,
  selectedType,
}: TypeFilterProps) {
  const typesWithAll = [
    { name: '모든 타입', identifier: 'all' },
    ...types.filter((type) => type.identifier !== 'unknown'),
  ];

  return (
    <Select value={selectedType} onValueChange={onChangeType}>
      <SelectTrigger className="max-w-30 w-30 sm:max-w-36 sm:w-36 rounded-lg">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className="bg-card border-border rounded-lg max-h-84"
        position="popper"
      >
        {typesWithAll.map((type) => (
          <SelectItem
            key={type.identifier}
            value={type.identifier}
            className="py-2 rounded-md"
          >
            {type.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
