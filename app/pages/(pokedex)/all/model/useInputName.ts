import { useDeferredValue, useMemo, useState } from 'react';

export default function useInputName() {
  const [inputValue, setInputValue] = useState('');

  const deferredInput = useDeferredValue(inputValue);

  const normalizedSearch = useMemo(
    () => (deferredInput ?? '').trim(),
    [deferredInput],
  );

  return {
    inputValue,
    setInputValue,
    normalizedSearch,
  };
}
