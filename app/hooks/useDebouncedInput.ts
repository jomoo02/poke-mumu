import { useState, ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function useDebouncedInput() {
  const [inputText, setInputText] = useState('');

  const handleInputTextChange = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, 300);

  return {
    inputText,
    handleInputTextChange,
  };
}
