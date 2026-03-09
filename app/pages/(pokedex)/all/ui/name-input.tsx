import { useState, startTransition, useEffect, ChangeEvent } from 'react';
import { Input } from '@/app/shared/ui/input';

interface NameInputProps {
  inputValue: string;
  onChange: (v: string) => void;
}
export default function NameInput({ inputValue, onChange }: NameInputProps) {
  const [localInput, setLocalInput] = useState(inputValue);

  useEffect(() => setLocalInput(inputValue), [inputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setLocalInput(v);
    startTransition(() => {
      onChange(v);
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium">이름</div>
      <div>
        <Input
          value={localInput}
          onChange={handleChange}
          placeholder="Name..."
          className="max-w-40 xs:max-w-48 sm:max-w-60 w-60 rounded-lg"
        />
      </div>
    </div>
  );
}
