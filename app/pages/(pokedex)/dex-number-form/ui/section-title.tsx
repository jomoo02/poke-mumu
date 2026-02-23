import { cn } from '@/app/shared/lib/cn';

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
    <h3
      id={id}
      className={cn(
        'text-3xl font-bold scroll-mt-24 mb-8 mt-12 pt-8',
        // isFirst ? '' : ' mt-12 pt-8',
      )}
    >
      {children}
    </h3>
  );
}
