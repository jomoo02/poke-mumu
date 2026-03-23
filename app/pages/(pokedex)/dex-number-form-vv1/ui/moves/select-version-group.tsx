import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select';

interface SelectVersionGroupProps {
  versionGroups: { id: number; label: string }[];
  versionGroup: number | undefined;
  onChange: (id: number) => void;
}

export default function SelectVersionGroup({
  versionGroup,
  versionGroups,
  onChange,
}: SelectVersionGroupProps) {
  const handleOnValueChange = (v: string) => {
    onChange(Number(v));
  };
  return (
    <Select value={String(versionGroup)} onValueChange={handleOnValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="gen" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {versionGroups.map((versionGroup) => (
            <SelectItem key={versionGroup.id} value={String(versionGroup.id)}>
              {versionGroup.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
