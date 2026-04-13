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
    <div className="inline-flex bg-muted p-1 rounded-lg gap-1.5">
      {versionGroups.map((vg) => (
        <Button
          onClick={() => handleOnValueChange(vg.id)}
          variant={'ghost'}
          key={vg.id}
          className={cn(
            ' opacity-50',
            versionGroup === vg.id
              ? 'bg-background hover:bg-background opacity-100 '
              : '',
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
