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
        'text-2xl font-semibold scroll-mt-24 mb-4',
        isFirst ? '' : ' border-t mt-12 pt-10',
      )}
    >
      {children}
    </h3>
  );
}
