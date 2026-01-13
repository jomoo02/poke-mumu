import { Type } from '@/app/entities/type/model';

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
    <select
      value={selectedType}
      onChange={(e) => onChangeType(e.target.value)}
      className="border rounded-md p-1.5 flex justify-center border-border bg-white"
    >
      {typesWithAll.map((t) => (
        <option value={t.identifier} key={t.identifier}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
