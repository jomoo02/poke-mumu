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
    <Input
      value={inputValue}
      onChange={handleChange}
      placeholder="Name..."
      className="flex-1 max-w-60 sm:w-60 rounded-lg"
    />
  );
}
