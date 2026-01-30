import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function useOpen() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const closeSearch = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return {
    isOpen,
    closeSearch,
    setIsOpen,
  };
}
