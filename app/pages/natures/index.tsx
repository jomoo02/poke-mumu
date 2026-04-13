'use client';

import { useMemo, useState } from 'react';

import { getStatLabel, isStatKey } from '@/app/entities/stats/model';
import { Checkbox } from '@/app/shared/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';
import { Input } from '@/app/shared/ui/input';

import { NATURES } from './confg';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

const getStatLabelKo = (v: string | null) => {
  if (!v || !isStatKey(v)) {
    return null;
  }

  return getStatLabel(v);
};

export default function NaturesPageUI() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [inputValue, setInputValue] = useState('');

  const data = NATURES.map(({ increase, decrease, ...rest }) => {
    return {
      ...rest,
      increase: getStatLabelKo(increase),
      decrease: getStatLabelKo(decrease),
    };
  });

  const filterdData = useMemo(() => {
    const keyword = inputValue.trim().toLowerCase();

    return data.filter(({ ko, en, ja }) => {
      if ([ko, ja, en.toLowerCase()].some((v) => v.includes(keyword))) {
        return true;
      }
      return false;
    });
  }, [inputValue, data]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

  const toggleAll = () =>
    setSelected((prev) =>
      prev.size === data.length
        ? new Set()
        : new Set(data.map((d) => d.identifier)),
    );

  const isAllSelected = selected.size === data.length;
  const isIndeterminate = selected.size > 0 && !isAllSelected;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 pb-12 min-h-svh flex flex-col gap-6 ">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mt-4">성격</h1>
        <p className="text-muted-foreground  pt-3 md:max-w-[80%] text-pretty break-keep">
          포켓몬 능력치에 영향을 미치는 요소로, 총 25가지의 성격이 있습니다.
        </p>
      </div>

      <div className="max-w-md mx-auto w-full">
        <Input
          value={inputValue}
          placeholder="Name..."
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="bg-card rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/70">
              <TableHead role="checkbox" className="h-11">
                <Checkbox
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el)
                      el.dataset.state = isIndeterminate
                        ? 'indeterminate'
                        : undefined;
                  }}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="h-11">성격</TableHead>
              <TableHead className="h-11">영칭</TableHead>
              <TableHead className="h-11">일칭</TableHead>
              <TableHead className="h-11">1.1배 상승</TableHead>
              <TableHead className="h-11">0.9배 하락</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterdData.map((d) => (
              <TableRow
                key={d.identifier}
                data-state={selected.has(d.identifier) ? 'selected' : undefined}
                className="hover:bg-muted/70"
              >
                <TableCell className="pl-4 py-2.5" role="checkbox">
                  <Checkbox
                    checked={selected.has(d.identifier)}
                    onCheckedChange={() => toggle(d.identifier)}
                  />
                </TableCell>
                <TableCell className="px-4 py-2.5">{d.ko}</TableCell>
                <TableCell className="px-4 py-2.5">{d.en}</TableCell>
                <TableCell className="px-4 py-2.5">{d.ja}</TableCell>
                <TableCell className="px-4 py-2.5">
                  <div className="flex items-center gap-1 ">
                    {d.increase || '-'}
                    {d.increase && (
                      <ArrowUpIcon className="size-4.5 text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2.5">
                  <div className="flex items-center gap-1">
                    {d.decrease || '-'}
                    {d.decrease && (
                      <ArrowDownIcon className="size-4.5 text-blue-500" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
