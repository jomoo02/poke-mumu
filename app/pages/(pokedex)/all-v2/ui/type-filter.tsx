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
    <div className="flex gap-2 items-center">
      <div className="text-sm font-medium">타입</div>
      <div>
        <Select value={selectedType} onValueChange={onChangeType}>
          <SelectTrigger className="w-26 sm:w-32 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            className="bg-card border-border rounded-xl max-h-84"
            position="popper"
          >
            {typesWithAll.map((type) => (
              <SelectItem
                key={type.identifier}
                value={type.identifier}
                className="py-2 rounded-lg"
              >
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // return (
  //   <select
  //     value={selectedType}
  //     onChange={(e) => onChangeType(e.target.value)}
  //     className="border rounded-md p-2 flex justify-center border-border bg-white font-medium text-sm custom-select w-40"
  //   >
  //     {typesWithAll.map((t) => (
  //       <option
  //         value={t.identifier}
  //         key={t.identifier}
  //         className={cn(
  //           'text-sm py-1 hover:bg-accent px-2 rounded-lg font-suit',
  //           selectedType === t.identifier ? 'bg-primary/10' : '',
  //         )}
  //       >
  //         {t.name}
  //       </option>
  //     ))}
  //   </select>
  // );
}
