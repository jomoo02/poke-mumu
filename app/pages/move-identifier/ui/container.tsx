'use client';

import Link from 'next/link';

import {
  type MoveDetail,
  type VersionMoveEntry,
  type PokemonWithMove,
} from '../model';

interface Props {
  move: MoveDetail;
  history: VersionMoveEntry[];
  pokemons: PokemonWithMove[];
}

export default function Container({ move, history, pokemons }: Props) {
  return (
    <div>
      {/* ── 버전별 변천사 ── */}
      <section>
        <h2>버전별 변천사</h2>
        {history.length === 0 ? (
          <p>버전별 데이터가 없어요</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>버전</th>
                <th>타입</th>
                <th>분류</th>
                <th>위력</th>
                <th>PP</th>
                <th>명중</th>
                <th>머신</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.versionGroupId}>
                  <td>{h.versionGroupNameKo}</td>
                  <td>{h.typeNameKo}</td>
                  <td>{h.damageClassNameKo}</td>
                  <td>{h.power ?? '-'}</td>
                  <td>{h.pp ?? '-'}</td>
                  <td>{h.accuracy ?? '-'}</td>
                  <td>
                    {h.machineType && h.machineNumber
                      ? `${h.machineType}${String(h.machineNumber).padStart(2, '0')}`
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
