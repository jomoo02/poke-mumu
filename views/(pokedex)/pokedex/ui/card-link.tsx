import { cn } from '@/shared/lib/cn';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { EarthIcon } from 'lucide-react';
import Link from 'next/link';

export default function CardLink({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link> & { className?: string }) {
  return (
    <Card
      render={<Link {...props} className={cn('hover:bg-muted', className)} />}
    >
      <div className="px-5">
        <div className="p-3 rounded-2xl bg-muted/70 w-fit">
          <EarthIcon className="size-8 text-foreground/70" />
        </div>
      </div>

      <CardHeader>
        <CardTitle>{children}</CardTitle>
        <CardDescription>모든 포켓몬 목록</CardDescription>
      </CardHeader>
    </Card>
  );
}
