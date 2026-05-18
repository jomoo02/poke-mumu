import { TypeBadge, TypeIconV3 } from '@/app/entities/type/ui';
import { VersionMoveEntry } from '../model';
import useVersionDiff from '../model/useMoveDiff';
import { DamageClassIcon } from '@/app/entities/damage-class/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';
import { ArrowRight } from 'lucide-react';

interface HistoryProps {
  history: VersionMoveEntry[];
}

export default function History({ history }: HistoryProps) {
  const { origin, changeRows } = useVersionDiff(history);

  // 변화 셀에 font-medium 적용하는 헬퍼
  // const diffClass = (changedFields: Set<DiffField>, field: DiffField) =>
  //   changedFields.has(field) ? 'font-medium' : '';

  if (changeRows.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-wide mt-10">변경 사항</h2>
      {origin && (
        <div className="pt-6">
          <h3 className="text-lg font-medium">초기값</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 items-center py-3">
            <div className="min-w-18">
              <div className="text-muted-foreground text-md">이름</div>
              <div className="">{origin.nameKo}</div>
            </div>
            <div className="min-w-14 w-14">
              <div className="text-muted-foreground text-md">타입</div>
              <div className="">{origin.typeNameKo}</div>
            </div>
            <div className="min-w-14 w-14">
              <div className="text-muted-foreground text-md">분류</div>
              <div className="">{origin.damageClassNameKo}</div>
            </div>

            <div className="min-w-14 w-14">
              <div className="text-muted-foreground text-md">위력</div>
              <div className="">{origin.power ? `${origin.power}` : '-'}</div>
            </div>
            <div className="min-w-14 w-14">
              <div className="text-muted-foreground text-md">명중률</div>
              <div className="">
                {origin.accuracy ? `${origin.accuracy}` : '-'}
              </div>
            </div>
            <div className="min-w-14 w-14">
              <div className="text-muted-foreground text-md">PP</div>
              <div className="">{origin.pp ? `${origin.pp}` : '-'}</div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-6">
        <h3 className="text-lg font-medium">변경 이력</h3>
        <div className="pt-1">
          {changeRows.map((row) => (
            <div key={row.versionGroupId} className="py-2">
              <span className="">{row.versionGroupNameKo}</span>
              <div className="flex flex-col gap-1 p-1">
                {row.changes.map((c) => (
                  <div key={c.label} className="flex items-center gap-x-1">
                    <span>-</span>
                    <span>{`${c.label}:`}</span>
                    <span>{c.from}</span>
                    <ArrowRight className="size-4" />
                    <span>{c.to}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Table className=" rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead>버전</TableHead>
            <TableHead>타입</TableHead>
            <TableHead>분류</TableHead>
            <TableHead>위력</TableHead>
            <TableHead>명중률</TableHead>
            <TableHead>PP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diffRows.map((r) => (
            <TableRow key={r.versionGroupId} className="">
              <TableCell className="">{r.versionGroupNameKo}</TableCell>
              <TableCell className="">
                <TypeBadge
                  type={{
                    identifier: r.typeIdentifier,
                    nameKo: r.typeNameKo,
                  }}
                />
              </TableCell>
              <TableCell className="">
                <DamageClassIcon damageClass={r.damageClassIdentifier} />
              </TableCell>
              <TableCell className="">{r.power ?? '-'}</TableCell>
              <TableCell className="">{r.accuracy ?? '-'}</TableCell>
              <TableCell className="">{r.pp ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      {/* <div className="pt-6">
        {diffRows.map((r) => (
          <div
            key={r.versionGroupId}
            className="flex flex-wrap gap-3 gap-x-6 border-b py-2 w-fit"
          >
            <div className="w-40 shrink-0 flex flex-col gap-y-1">
              <div className="text-md text-muted-foreground">버전</div>
              <div className="font-medium">{r.versionGroupNameKo}</div>
            </div>
            <div className="w-24 shrink-0 flex flex-col gap-y-1">
              <div className="text-md text-muted-foreground">타입</div>
              <div className="font-medium">
                <TypeBadge
                  type={{ identifier: r.typeIdentifier, nameKo: r.typeNameKo }}
                />
              </div>
            </div>
            <div className="w-24 shrink-0 flex flex-col gap-y-1">
              <div className="text-md text-muted-foreground">분류</div>
              <div className="font-medium">
                <DamageClassIcon damageClass={r.damageClassIdentifier} />
              </div>
            </div>
            <div className="w-14 shrink-0 flex flex-col gap-y-1">
              <div className="text-md text-muted-foreground">위력</div>
              <div className="font-medium">{r.power ?? '-'}</div>
            </div>
            <div className="w-14 shrink-0 flex flex-col gap-y-1">
              <div className="text-md text-muted-foreground">명중률</div>
              <div className="font-medium">{r.accuracy ?? '-'}</div>
            </div>
            <div className="w-14 shrink-0 flex flex-col gap-y-1">
              <div className="text-md text-muted-foreground">PP</div>
              <div className="font-medium">{r.pp ?? '-'}</div>
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
}
