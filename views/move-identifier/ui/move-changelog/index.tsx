import { VersionGroupBadge } from '@/entities/version-group/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  PageLayoutSection,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table';
import { ArrowRightIcon, DotIcon } from 'lucide-react';

interface MoveChangelogProps {
  changeLog:
    | {
        id: number;
        field: string;
        oldValue: string | null;
        newValue: string | null;
        versionGroup: {
          identifier: string;
          nameKo: string;
        };
      }[]
    | null;
}

const transform = (log: {
  id: number;
  field: string;
  oldValue: string | null;
  newValue: string | null;
  versionGroup: {
    identifier: string;
    nameKo: string;
  };
}) => {
  if (log.oldValue && log.newValue) {
    return (
      <div className="flex items-center gap-1.5">
        {log.oldValue}
        <ArrowRightIcon className="size-4 inline-flex" />
        {log.newValue}
      </div>
    );
  }
  if (!log.oldValue) {
    return <div>{log.newValue} 추가</div>;
  }
};

export default function MoveChageLog({ changeLog }: MoveChangelogProps) {
  if (!changeLog) {
    return null;
  }

  const versionGroups = [
    ...new Set(changeLog.map(({ versionGroup }) => versionGroup.identifier)),
  ];

  const group = versionGroups.map((versionGroup) => {
    const filterd = changeLog.filter(
      (log) => versionGroup === log.versionGroup.identifier,
    );

    return {
      versionGroup: filterd[0].versionGroup,
      changelog: filterd,
    };
  });

  return (
    <PageLayoutSection className=" border-t pt-12 mt-12">
      <PageLayoutSectionTitle className="t">변경사항</PageLayoutSectionTitle>
      <div className="grid gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {group.map((g) => (
          <div key={g.versionGroup.identifier} className="grid gap-3">
            <div>
              <VersionGroupBadge versionGroup={g.versionGroup} />
            </div>
            <div className="flex flex-col px-1 gap-3">
              {g.changelog.map((log) => (
                <div key={log.id} className="flex itmes-center text-md gap-1.5">
                  <DotIcon className="size-5" />
                  <div className="text-foreground/70 font-medium">
                    {log.field}:
                  </div>
                  <div>{transform(log)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayoutSection>
  );
}
