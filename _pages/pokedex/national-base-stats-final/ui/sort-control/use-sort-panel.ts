import { useState } from 'react';

// 시트·팝오버의 열림 상태
export function useSortPanel() {
  const [open, setOpen] = useState(false);

  return { open, onOpenChange: setOpen, close: () => setOpen(false) };
}
