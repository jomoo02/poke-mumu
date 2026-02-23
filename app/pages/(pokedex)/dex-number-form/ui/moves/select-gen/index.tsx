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

interface SelectGenProps {
  gen: number | undefined;
  gens: number[];
  onChange: (v: number) => void;
}

export default function SelectGen({ gen, gens, onChange }: SelectGenProps) {
  const handleValueChange = (target: string) => {
    onChange(Number(target));
  };
  return (
    <Select value={String(gen)} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="gen" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {gens.map((gen) => (
            <SelectItem key={gen} value={String(gen)}>
              {gen}세대
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
