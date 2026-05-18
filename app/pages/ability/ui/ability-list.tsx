import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';

import { type AbilityView } from '../model';
import Link from 'next/link';

interface AbilityListProps {
  abilities: AbilityView[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  const getAppeared = (ability: AbilityView) =>
    ability.gen ? `${ability.gen}세대` : '-';
  return (
    <div className="rounded-4xl bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-4 px-4">특성</TableHead>
            <TableHead className="py-4 px-4">설명</TableHead>
            <TableHead className="py-4 px-4">등장</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {abilities.map((ability) => (
            <TableRow key={ability.identifier}>
              <TableCell className="py-4 px-4">
                <Link
                  className="font-medium hover:underline underline-offset-3 "
                  href={`/ability/${ability.identifier}`}
                >
                  {ability.nameKo}
                </Link>
              </TableCell>
              <TableCell className="py-4 px-4 min-w-[200px]">
                <p className="line-clamp-3 whitespace-normal wrap-break-word">
                  {ability.flavorText}
                </p>
              </TableCell>
              <TableCell className="py-4 px-4">
                {getAppeared(ability)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
