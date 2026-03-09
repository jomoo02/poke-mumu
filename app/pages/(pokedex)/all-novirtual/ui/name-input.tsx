import { ChangeEvent } from 'react';

import { Input } from '@/app/shared/ui/input';

interface NameInputProps {
  inputValue: string;
  onChange: (v: string) => void;
}
export default function NameInput({ inputValue, onChange }: NameInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium">이름</div>
      <div>
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder="Search..."
          className="max-w-40 xs:max-w-48 sm:max-w-60 w-60 rounded-lg"
        />
      </div>
    </div>
  );
}
