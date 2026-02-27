import { Input } from '@/app/shared/ui/input';
import { ChangeEvent } from 'react';

interface NameInputProps {
  inputValue: string;
  onChange: (v: string) => void;
}
export default function NameInput({ inputValue, onChange }: NameInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex gap-2 items-center">
      <div className="text-sm font-medium">이름</div>
      <div>
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder="Search name..."
          className="w-28 sm:w-40 md:w-50"
          // className="max-w-70"
        />
      </div>
    </div>
  );
}
