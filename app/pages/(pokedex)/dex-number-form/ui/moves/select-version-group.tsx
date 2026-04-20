import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';
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
  const handleOnValueChange = (v: number) => {
    onChange(Number(v));
  };
  return (
    <div className="inline-flex p-1 rounded-4xl gap-3">
      {versionGroups.map((vg) => (
        <Button
          onClick={() => handleOnValueChange(vg.id)}
          variant={'outline'}
          key={vg.id}
          className={cn(
            ' rounded-2xl',
            versionGroup === vg.id ? 'bg-muted hover:bg-muted' : '',
          )}
        >
          {vg.label}
        </Button>
      ))}
    </div>
    // <Select value={String(versionGroup)} onValueChange={handleOnValueChange}>
    //   <SelectTrigger>
    //     <SelectValue placeholder="gen" />
    //   </SelectTrigger>
    //   <SelectContent position="popper">
    //     <SelectGroup>
    //       {versionGroups.map((versionGroup) => (
    //         <SelectItem key={versionGroup.id} value={String(versionGroup.id)}>
    //           {versionGroup.label}
    //         </SelectItem>
    //       ))}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
  );
}
