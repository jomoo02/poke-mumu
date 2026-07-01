'use client';

import { useState, useDeferredValue } from 'react';

export default function useSearchQuery() {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);

  return { input, setInput, deferredInput };
}
