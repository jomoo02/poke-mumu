import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';

import { getStatLabelKo, type Nature } from '../model/nature';

interface NatureListListProps {
  natures: Nature[];
}

export default function NatureListList({ natures }: NatureListListProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">성격</TableHead>
            <TableHead className="px-4 py-2">영칭</TableHead>
            <TableHead className="px-4 py-2">일칭</TableHead>
            <TableHead className="px-4 py-2">상승</TableHead>
            <TableHead className="px-4 py-2">하락</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {natures.map((d) => (
            <TableRow key={d.identifier}>
              <TableCell className="px-4 py-2.5 font-medium">{d.ko}</TableCell>
              <TableCell className="px-4 py-2.5">{d.en}</TableCell>
              <TableCell className="px-4 py-2.5">{d.ja}</TableCell>
              <TableCell className="px-4 py-2.5 ">
                <div className="flex items-center gap-x-1">
                  {d.increase ? getStatLabelKo(d.increase) : '-'}
                  {d.increase && (
                    <ArrowUpIcon className="size-4.5 text-red-400" />
                  )}
                </div>
              </TableCell>
              <TableCell className="px-4 py-2.5">
                <div className="flex items-center gap-x-1">
                  {d.decrease ? getStatLabelKo(d.decrease) : '-'}
                  {d.decrease && (
                    <ArrowDownIcon className="size-4.5 text-blue-400" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
