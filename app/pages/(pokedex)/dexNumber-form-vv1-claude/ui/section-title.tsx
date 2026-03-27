import { cn } from '@/app/shared/lib/cn';

interface SectionTitleProps {
  id: string;
  children: React.ReactNode;
}

export default function SectionTitle({ children, id }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        'scroll-mt-24 mt-16 mb-6 flex items-center gap-3',
        'text-xl font-semibold tracking-tight',
      )}
    >
      <span className="block w-1 h-5 rounded-full bg-primary shrink-0" />
      {children}
    </h2>
  );
}
