'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { type VersionMoveView } from '../model';
import { type VersionGroupMeta } from '../api';

interface Props {
  versionGroup: VersionGroupMeta;
  moves: VersionMoveView[];
}

export default function VersionMoveListUI({ versionGroup, moves }: Props) {
  // ── 머신 목록 분리 ──
  const machines = useMemo(() => {
    return moves
      .filter((m) => m.machineType != null && m.machineNumber != null)
      .sort((a, b) => {
        // machineType 순 (HM > TM > TR), 번호순
        if (a.machineType !== b.machineType) {
          return (a.machineType ?? '').localeCompare(b.machineType ?? '');
        }
        return (a.machineNumber ?? 0) - (b.machineNumber ?? 0);
      });
  }, [moves]);

  return (
    <div>
      {/* ── 헤더 ── */}
      <h1>{versionGroup.nameKo}</h1>
      <p>
        {versionGroup.generation}세대 · {moves.length}개 기술
      </p>

      {/* ── 기술 목록 테이블 ── */}
      <section>
        <h2>기술 목록</h2>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>타입</th>
              <th>분류</th>
              <th>위력</th>
              <th>PP</th>
              <th>명중</th>
            </tr>
          </thead>
          <tbody>
            {moves.map((m) => (
              <tr key={m.id}>
                <td>
                  <Link href={`/move/${m.moveIdentifier}`}>{m.nameKo}</Link>
                </td>
                <td>{m.typeNameKo}</td>
                <td>{m.damageClassNameKo}</td>
                <td>{m.power ?? '-'}</td>
                <td>{m.pp ?? '-'}</td>
                <td>{m.accuracy ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── 기술머신 목록 ── */}
      {machines.length > 0 && (
        <section>
          <h2>기술머신 ({machines.length})</h2>
          <table>
            <thead>
              <tr>
                <th>머신</th>
                <th>기술</th>
                <th>타입</th>
                <th>위력</th>
                <th>PP</th>
                <th>명중</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.machineType}
                    {String(m.machineNumber ?? 0).padStart(2, '0')}
                  </td>
                  <td>
                    <Link href={`/move/${m.moveIdentifier}`}>{m.nameKo}</Link>
                  </td>
                  <td>{m.typeNameKo}</td>
                  <td>{m.power ?? '-'}</td>
                  <td>{m.pp ?? '-'}</td>
                  <td>{m.accuracy ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
