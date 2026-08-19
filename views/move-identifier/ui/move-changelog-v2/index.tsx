import { VersionGroupBadge } from '@/entities/version-group/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  PageLayoutSection,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

import { ArrowRightIcon, DotIcon } from 'lucide-react';
import { Fragment } from 'react';

interface MoveChangelogProps {
  changeLog:
    | {
        id: number;
        field: string;
        oldValue: string | null;
        newValue: string | null;
        versionGroup: {
          generation: number;
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
  // versionGroup: {
  //   generation: number;
  //   identifier: string;
  //   nameKo: string;
  // };
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

export default function MoveChageLogV2({ changeLog }: MoveChangelogProps) {
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

  const grouped = Object.values(
    changeLog.reduce<
      Record<
        number,
        {
          generation: number;
          versionGroups: Record<
            string,
            {
              id: number;
              identifier: string;
              nameKo: string;
              field: string;
              oldValue: string | null;
              newValue: string | null;
            }[]
          >;
        }
      >
    >((acc, { id, field, oldValue, newValue, versionGroup }) => {
      const { generation, identifier, nameKo } = versionGroup;

      acc[generation] ??= {
        generation,
        versionGroups: {},
      };

      acc[generation].versionGroups[identifier] ??= [];

      acc[generation].versionGroups[identifier].push({
        id,
        identifier,
        nameKo,
        field,
        oldValue,
        newValue,
      });

      return acc;
    }, {}),
  ).map(({ generation, versionGroups }) => ({
    generation,
    versionGroups: Object.entries(versionGroups).map(
      ([identifier, changes]) => ({
        identifier,
        nameKo: changes[0].nameKo,
        changes: changes.map(({ nameKo, identifier, ...change }) => change),
      }),
    ),
  }));

  return (
    <PageLayoutSection className=" border-t pt-12 mt-12 border bg-card rounded-4xl p-6 h-fit">
      <PageLayoutSectionTitle className="t">변경사항</PageLayoutSectionTitle>
      <div className="pt-3">
        {group.map(({ versionGroup, changelog }, idx) => (
          <Fragment key={versionGroup.identifier}>
            {idx > 0 && (
              <div className="border-b-3 border-dotted w-full h-px my-6" />
            )}
            <div
              key={versionGroup.identifier}
              className="grid grid-cols-12 gap-6"
            >
              <div className="col-span-4 font-medium">
                <VersionGroupBadge versionGroup={versionGroup} />
              </div>
              <div className="col-span-8">
                {changelog.map((log) => (
                  <div key={log.id} className="flex items-center gap-1.5">
                    <DotIcon className="size-4.5" />
                    <div className="text-foreground/70 font-medium">
                      {log.field}:
                    </div>
                    <div>{transform(log)}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      {/* <div className="grid">
        {grouped.map(({ generation, versionGroups }, idx) => (
          <Fragment key={generation}>
            {idx > 0 && (
              <div className="border-b-3 border-dotted w-full h-px my-6" />
            )}
            <div key={generation} className="grid grid-cols-12 gap-6">
              <div className="col-span-3 font-suite text-lg">
                {generation}세대
              </div>
              <div className="col-span-9">
                <div className="">
                  {versionGroups.map((versionGroup) => (
                    <div
                      key={versionGroup.identifier}
                      className="flex flex-col gap-3"
                    >
                      <div className="text-lg font-medium">
                        {versionGroup.nameKo}
                      </div>
                      <div className="flex flex-col gap-1 -ml-1">
                        {versionGroup.changes.map((log) => (
                          <div
                            key={log.id}
                            className="flex items-center gap-1.5"
                          >
                            <DotIcon className="size-4.5" />
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
              </div>
            </div>
          </Fragment>
        ))}
      </div> */}
    </PageLayoutSection>
  );
}
