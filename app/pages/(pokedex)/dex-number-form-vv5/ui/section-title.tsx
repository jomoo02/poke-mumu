import { cn } from '@/app/shared/lib/cn';
import Image from 'next/image';

interface SectionTitleProps {
  id: string;
  children: React.ReactNode;
  isFirst?: boolean;
}

export default function SectionTitle({
  children,
  id,
  isFirst,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        'text-2xl font-bold scroll-mt-24 mb-6 ',
        isFirst ? '' : ' mt-12 pt-8',
      )}
    >
      {children}
    </h2>
  );
}
