import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

function ItemContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('rounded-4xl bg-card w-full ', className)} {...props} />
  );
}

function ItemImg({ srcs }: { srcs: string[] }) {
  return (
    <div
      className={cn(
        // 'grid bg-muted/70 px-5 py-5 gap-1.5 rounded-4xl justify-items-center aspect-16/10',
        'aspect-16/10 bg-muted/70 p-5 rounded-2xl flex justify-center items-center',
        srcs.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
      )}
    >
      {srcs.map((src) => (
        <div
          key={src}
          className="size-full relative overflow-hidden aspect-191/112"
        >
          <Image
            src={`/logo/${src}`}
            alt={`${src}`}
            fill
            sizes="80px"
            draggable={false}
            className="object-contain"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}

function ItemContent({
  title,
  description,
  ...props
}: React.ComponentProps<'div'> & { title: string; description: string }) {
  return (
    <div className="flex flex-col pt-1.5" {...props}>
      <div className="text-md font-medium">{title}</div>
      <div className="text-sm font-medium text-foreground/70 break-keep">
        {description}
      </div>
    </div>
  );
}

export { ItemContainer, ItemContent, ItemImg };
