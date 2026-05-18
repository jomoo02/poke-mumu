'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { type VersionGroupView } from '../model';

interface Props {
  versionGroups: VersionGroupView[];
}

export default function VersionSelectUI({ versionGroups }: Props) {
  // 세대별 그룹핑
  const grouped = useMemo(() => {
    const map = new Map<number, VersionGroupView[]>();

    for (const vg of versionGroups) {
      const arr = map.get(vg.generation) ?? [];
      arr.push(vg);
      map.set(vg.generation, arr);
    }

    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [versionGroups]);

  return (
    <div>
      <h1>버전별 기술</h1>
      <div>
        {grouped.map(([generation, versions]) => (
          <div key={generation}>
            <h2>{generation}세대</h2>
            <ul>
              {versions.map((vg) => (
                <li key={vg.identifier}>
                  <Link href={`/move/version/${vg.identifier}`}>
                    {vg.nameKo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
