'use client';

import { Badge, ToastProvider } from '../_shared/ui';
import { damageClassLabel, typeLabel } from '../_shared/pokemon/moveEnums';
import type { MoveEditorView } from '../_entities/move/types';
import { MoveMasterSection } from './sections/MoveMasterSection';
import { ChangeLogSection } from './sections/ChangeLogSection';
import { LegendsArceusSection } from './sections/LegendsArceusSection';
import { LegendsZaSection } from './sections/LegendsZaSection';
import { ChampionsMoveSection } from './sections/ChampionsMoveSection';
import { ChampionsPokeMoveSection } from './sections/ChampionsPokeMoveSection';

export function MoveEditor({ view }: { view: MoveEditorView }) {
  const { master } = view;

  return (
    <ToastProvider>
      <div className="mx-auto flex max-w-3xl flex-col gap-5 p-4 sm:p-6">
        <header className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">{master.nameKo}</h1>
            <Badge tone="info">#{master.id}</Badge>
            <Badge>{master.identifier}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {master.nameEn} · {master.nameJa} · {typeLabel(master.typeId)} ·{' '}
            {damageClassLabel(master.damageClassId)}
          </p>
        </header>

        <MoveMasterSection
          master={master}
          identifier={master.identifier}
          versionMoves={view.versionMoves}
        />
        <ChangeLogSection
          moveId={master.id}
          identifier={master.identifier}
          initial={view.changeLogs}
        />
        <LegendsArceusSection
          master={master}
          identifier={master.identifier}
          initial={view.legendsArceus}
        />
        <LegendsZaSection
          master={master}
          identifier={master.identifier}
          initial={view.legendsZa}
        />
        <ChampionsMoveSection
          master={master}
          identifier={master.identifier}
          initial={view.champions}
        />
        <ChampionsPokeMoveSection
          moveId={master.id}
          identifier={master.identifier}
          list={view.championsPokeMoves}
        />
      </div>
    </ToastProvider>
  );
}
