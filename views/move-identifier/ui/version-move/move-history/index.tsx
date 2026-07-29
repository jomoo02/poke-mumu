import { ArrowRight, DotIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { cn } from '@/shared/lib/cn';
import type { VersionMove } from '@/entities/move/model';
import { VersionGroupBadge } from '@/entities/version-group/ui/badge';

import { VersionChangeRow } from '../move-changelog';

interface HistoryProps {
  origin: VersionMove;
  changeRows: VersionChangeRow[];
}

export default function History({ origin, changeRows }: HistoryProps) {
  if (changeRows.length === 0) {
    return null;
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>변경 사항</CardTitle>
      </CardHeader>
      <CardContent>
        <CardGroup>
          <div className="font-semibold">초기값</div>
          <div className="p-4 bg-muted/50 rounded-2xl">
            <MoveItemValue subject="이름" value={origin.nameKo} />
            <MoveItemValue subject="타입" value={origin.typeNameKo} />
            <MoveItemValue subject="분류" value={origin.damageClassNameKo} />
            <MoveItemValue subject="위력" value={origin.power} />
            <MoveItemValue subject="명중률" value={origin.accuracy} />
            <MoveItemValue subject="PP" value={origin.pp} />
          </div>
        </CardGroup>
        <CardGroup>
          <div className="font-semibold">변경 이력</div>
          <div className="flex flex-col gap-5">
            {changeRows.map((row) => (
              <div key={row.versionGroupId} className="flex flex-col gap-2">
                {/* <div className="text-md font-medium">
                  {row.versionGroupNameKo}
                </div> */}
                <VersionGroupBadge
                  versionGroup={{
                    identifier: row.versionGroupIdentifier,
                    nameKo: row.versionGroupNameKo,
                  }}
                />
                <div className="bg-muted/50 p-4 rounded-2xl">
                  {row.changes.map((change) => (
                    <MoveItemValue
                      key={change.label}
                      subject={change.label}
                      value={
                        <div className="flex gap-2.5 items-center">
                          <span>{change.from}</span>
                          <ArrowRight className="size-4" strokeWidth={1.75} />
                          <span>{change.to}</span>
                        </div>
                      }
                    ></MoveItemValue>
                  ))}
                </div>
                {/* <ul className="list-none grid gap-y-1.5">
                  {row.changes.map((change) => (
                    <li
                      key={change.label}
                      className="flex items-center gap-1 font-normal text-md tabular-nums"
                    >
                      <DotIcon className="size-4" />
                      <span>{`${change.label}:`}</span>
                      <span>{change.from}</span>

                      <ArrowRight className="size-4" strokeWidth={1.75} />

                      <span>{change.to}</span>
                    </li>
                  ))}
                </ul> */}
              </div>
            ))}
          </div>
        </CardGroup>
      </CardContent>
    </Card>
  );
}

interface MoveItemValueProps {
  subject: string;
  value: string | number | React.ReactNode | null;
  className?: string;
}

function MoveItemValue({ subject, value }: MoveItemValueProps) {
  return (
    <div className="flex justify-between gap-x-2.5 border-b py-3 first:pt-0 last:pb-0 last:border-b-0 items-center text-md">
      <span className="text-foreground/70">{`${subject}`}</span>
      <span className="font-medium">{value ? value : '-'}</span>
    </div>
  );
}

// function MoveItemValue({ subject, value, className }: MoveItemValueProps) {
//   return (
//     <p className={cn('text-md', className)}>
//       <span className="text-foreground/70">{`${subject}: `}</span>
//       <span>{value ? value : '-'}</span>
//     </p>
//   );
// }
