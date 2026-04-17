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
    <div className="inline-flex bg-muted p-1 rounded-4xl gap-1.5">
      {gens.map((curGen) => (
        <Button
          onClick={() => onChange(curGen)}
          variant={'ghost'}
          key={curGen}
          className={cn(
            ' opacity-50 rounded-2xl',
            gen === curGen
              ? 'bg-background hover:bg-background opacity-100 shadow-xs'
              : '',
          )}
        >
          {curGen}세대
        </Button>
      ))}
    </div>
    // <Select value={String(gen)} onValueChange={handleValueChange}>
    //   <SelectTrigger>
    //     <SelectValue placeholder="gen" />
    //   </SelectTrigger>
    //   <SelectContent position="popper">
    //     <SelectGroup>
    //       {gens.map((gen) => (
    //         <SelectItem key={gen} value={String(gen)}>
    //           {gen}세대
    //         </SelectItem>
    //       ))}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
  );
}
