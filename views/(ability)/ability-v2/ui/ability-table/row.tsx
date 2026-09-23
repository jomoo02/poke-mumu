import type { Ability } from '@/entities/ability/model';
import { cn } from '@/shared/lib/cn';
import Link from 'next/link';
interface AbilityTableRowProps {
  ability: Ability;
}

export default function AbilityTableRow({ ability }: AbilityTableRowProps) {
  const href = `/ability/${ability.identifier}`;
  const appeared = ability.isChampions ? '챔피언스' : `${ability.gen}세대`;

  return (
    <tr className="group/row cursor-pointer [@media(hover:hover)]:hover:bg-muted/50">
      <TableCell>
        <div className="flex flex-col gap-1">
          <Link
            href={href}
            className={cn(
              'truncate font-semibold outline-none',
              'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
              '[@media(hover:hover)]:hover:underline',
            )}
          >
            {ability.nameKo}
          </Link>
          <div className=" truncate text-sm text-foreground/70 font-medium">{`${ability.nameEn} / ${ability.nameJa}`}</div>
        </div>
      </TableCell>

      <TableCell>
        <p className="line-clamp-2 break-keep text-md">{ability.flavorText}</p>
      </TableCell>
      <TableCell>
        <div className="text-md truncate text-foreground/70 font-medium">
          {appeared}
        </div>
      </TableCell>
    </tr>
  );
}

function TableCell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <td className={cn('px-4 py-3.5 border-b', className)}>{children}</td>;
}
