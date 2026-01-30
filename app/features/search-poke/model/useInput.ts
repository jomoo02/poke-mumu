import { useState, useRef, useEffect } from 'react';

export default function useInput(isOpen: boolean) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    inputValue,
    setInputValue,
    inputRef,
  };
}
