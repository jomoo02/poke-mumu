'use client';

import Link from 'next/link';

import { type MoveView } from '../model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';
import { TypeBadge } from '@/app/entities/type/ui';
import { memo } from 'react';
import { DamageClassBadge } from '@/app/entities/damage-class/ui';
interface Props {
  moves: MoveView[];
}

function MoveList({ moves }: Props) {
  return (
    <div className="rounded-2xl bg-card">
      {/* ── 테이블 ── */}
      <Table className="">
        <TableHeader>
          <TableRow>
            {/* <TableHead>id</TableHead> */}
            <TableHead className="py-3.5 px-4">이름</TableHead>
            <TableHead className="py-3.5 px-4">타입</TableHead>
            <TableHead className="py-3.5 px-4">분류</TableHead>
            <TableHead className="py-3.5 px-4 text-right">위력</TableHead>

            <TableHead className="py-3.5 px-4  text-right">명중률</TableHead>
            <TableHead className="py-3.5 px-4  text-right">PP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moves.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="p-4">
                조건에 맞는 기술이 없어요
              </TableCell>
            </TableRow>
          ) : (
            moves.map((m) => (
              <TableRow key={m.identifier}>
                {/* <TableCell>{m.id}</TableCell> */}
                <TableCell>
                  <Link
                    href={`/move/${m.identifier}`}
                    className="hover:underline active:underline underline-offset-4"
                  >
                    {m.nameKo}
                  </Link>
                </TableCell>
                <TableCell>
                  <TypeBadge
                    type={{
                      nameKo: m.typeNameKo,
                      identifier: m.typeIdentifier,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <DamageClassBadge
                    damageClass={m.damageClassIdentifier}
                    damageClassEntity={{
                      identifier: m.damageClassIdentifier,
                      nameKo: m.damageClassNameKo,
                    }}
                  />
                </TableCell>
                <TableCell className="text-right text-md">
                  {m.power ?? '-'}
                </TableCell>

                <TableCell className="text-right text-md">
                  {m.accuracy ? `${m.accuracy}%` : '-'}
                </TableCell>
                <TableCell className="text-right text-md">
                  {m.pp ?? '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default memo(MoveList);
