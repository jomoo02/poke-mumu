import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { NATURE_LISTV2 } from '../config';
import { ChevronsDownIcon, ChevronsUpIcon } from 'lucide-react';

export default function NewModel() {
  const heads = ['공격', '방어', '특수공격', '특수방어', '스피드'];

  return (
    <div className=" overflow-hidden rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-34 bg-muted/50" />
            {heads.map((head) => (
              <TableHead key={head} className="bg-muted/50">
                <div className="flex items-center gap-1">
                  {head}

                  <ChevronsDownIcon className="inline-flex size-5 text-blue-600 dark:text-blue-500" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {NATURE_LISTV2.map(({ label, natures }) => (
            <TableRow key={label}>
              <TableCell className="bg-muted/50">
                <div className="flex items-center gap-1 ">
                  {label}
                  <ChevronsUpIcon className="inline-flex size-5 text-red-600 dark:text-red-500" />
                </div>
              </TableCell>
              {natures.map((nature) => (
                <TableCell
                  key={nature.identifier}
                  className={
                    nature.identifier === 'adamant'
                      ? 'bg-primary/10 dark:bg-primary/70 rounded-md'
                      : ''
                  }
                >
                  <div>
                    <div>{nature.ko}</div>
                    <div className="text-sm text-foreground/70">
                      {nature.en} / {nature.ja}
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
