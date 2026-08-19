'use client';

import { useState, useTransition } from 'react';
import { Badge, Button, Field, Input, Select, Textarea, useToast } from '../../_shared/ui';
import {
  DAMAGE_CLASS_OPTIONS,
  TYPE_OPTIONS,
  damageClassLabel,
  typeLabel,
} from '../../_shared/pokemon/moveEnums';
import { MOVE_TARGET_OPTIONS } from '../../_shared/pokemon/moveTarget';
import { versionGroupIdentifier } from '../../_shared/pokemon/versionGroup';
import type { MoveMaster, VersionMoveRefRow } from '../../_entities/move/types';
import { updateMove } from '../../_features/update-move/actions';

const SV_VG = 21; // scarlet-violet

interface FormState {
  nameKo: string;
  nameEn: string;
  nameJa: string;
  typeId: string;
  damageClassId: string;
  power: string;
  pp: string;
  accuracy: string;
  priority: string;
  effectChance: string;
  targetId: string;
  isContact: string; // 'true' | 'false' | ''
  description: string;
}

function s(v: number | string | null | undefined): string {
  return v === null || v === undefined ? '' : String(v);
}

function fromMaster(m: MoveMaster): FormState {
  return {
    nameKo: m.nameKo,
    nameEn: m.nameEn,
    nameJa: m.nameJa,
    typeId: s(m.typeId),
    damageClassId: s(m.damageClassId),
    power: s(m.power),
    pp: s(m.pp),
    accuracy: s(m.accuracy),
    priority: s(m.priority),
    effectChance: s(m.effectChance),
    targetId: s(m.targetId),
    isContact: m.isContact === null ? '' : String(m.isContact),
    description: s(m.description),
  };
}

export function MoveMasterSection({
  master,
  identifier,
  versionMoves,
}: {
  master: MoveMaster;
  identifier: string;
  versionMoves: VersionMoveRefRow[];
}) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(() => fromMaster(master));
  const [dirty, setDirty] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  const sv = versionMoves.find((v) => v.versionGroupId === SV_VG) ?? null;
  const svMismatch =
    sv !== null &&
    (sv.power !== master.power ||
      sv.pp !== master.pp ||
      sv.accuracy !== master.accuracy ||
      sv.typeId !== master.typeId ||
      sv.damageClassId !== master.damageClassId);

  function save() {
    startTransition(async () => {
      const result = await updateMove(
        {
          id: master.id,
          nameKo: form.nameKo,
          nameEn: form.nameEn,
          nameJa: form.nameJa,
          typeId: form.typeId,
          damageClassId: form.damageClassId,
          power: form.power,
          pp: form.pp,
          accuracy: form.accuracy,
          priority: form.priority || '0',
          effectChance: form.effectChance,
          targetId: form.targetId,
          isContact: form.isContact === '' ? null : form.isContact === 'true',
          description: form.description,
        },
        identifier,
      );
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '저장 실패');
        return;
      }
      setDirty(false);
      toast('success', 'master 저장됨');
    });
  }

  return (
    <section
      className={
        'rounded-xl border bg-card p-4 shadow-sm sm:p-5 ' +
        (dirty ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-border')
      }
    >
      <header className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">기술 마스터 (move)</h2>
        <Badge tone="info">#{master.id}</Badge>
        <Badge>{master.identifier}</Badge>
        {dirty ? <Badge tone="warn">수정됨</Badge> : null}
        {svMismatch ? <Badge tone="warn">SV(vg21) 불일치</Badge> : null}
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="name_ko">
          <Input value={form.nameKo} onChange={(e) => set('nameKo', e.target.value)} />
        </Field>
        <Field label="name_en">
          <Input value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} />
        </Field>
        <Field label="name_ja">
          <Input value={form.nameJa} onChange={(e) => set('nameJa', e.target.value)} />
        </Field>
        <Field label="type *">
          <Select value={form.typeId} onChange={(e) => set('typeId', e.target.value)}>
            {TYPE_OPTIONS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="damage_class">
          <Select
            value={form.damageClassId}
            onChange={(e) => set('damageClassId', e.target.value)}
          >
            <option value="">—</option>
            {DAMAGE_CLASS_OPTIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="target *">
          <Select value={form.targetId} onChange={(e) => set('targetId', e.target.value)}>
            {MOVE_TARGET_OPTIONS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="power" hint="빈값 = null">
          <Input type="number" value={form.power} onChange={(e) => set('power', e.target.value)} />
        </Field>
        <Field label="pp" hint="빈값 = null">
          <Input type="number" value={form.pp} onChange={(e) => set('pp', e.target.value)} />
        </Field>
        <Field label="accuracy" hint="빈값 = null(항상명중)">
          <Input
            type="number"
            value={form.accuracy}
            onChange={(e) => set('accuracy', e.target.value)}
          />
        </Field>
        <Field label="priority">
          <Input
            type="number"
            value={form.priority}
            onChange={(e) => set('priority', e.target.value)}
          />
        </Field>
        <Field label="effect_chance" hint="빈값 = null">
          <Input
            type="number"
            value={form.effectChance}
            onChange={(e) => set('effectChance', e.target.value)}
          />
        </Field>
        <Field label="is_contact">
          <Select value={form.isContact} onChange={(e) => set('isContact', e.target.value)}>
            <option value="">미지정</option>
            <option value="true">접촉</option>
            <option value="false">비접촉</option>
          </Select>
        </Field>
      </div>

      <div className="mt-3">
        <Field label="description *">
          <Textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={save} disabled={pending || !dirty}>
          {pending ? '저장 중…' : '저장'}
        </Button>
      </div>

      {/* version_move 참조(읽기전용) */}
      <div className="mt-4 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => setShowRef((v) => !v)}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {showRef ? '▼' : '▶'} version_move 참조 ({versionMoves.length}행, 읽기전용)
        </button>
        {showRef ? (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-1 pr-3">version_group</th>
                  <th className="py-1 pr-3">power</th>
                  <th className="py-1 pr-3">pp</th>
                  <th className="py-1 pr-3">accuracy</th>
                  <th className="py-1 pr-3">type</th>
                  <th className="py-1 pr-3">class</th>
                  <th className="py-1 pr-3">usable</th>
                </tr>
              </thead>
              <tbody>
                {versionMoves.map((v) => (
                  <tr
                    key={v.versionGroupId}
                    className={
                      'border-b border-border/50 ' +
                      (v.versionGroupId === SV_VG ? 'bg-blue-50/40 dark:bg-blue-950/20' : '')
                    }
                  >
                    <td className="py-1 pr-3">{versionGroupIdentifier(v.versionGroupId)}</td>
                    <td className="py-1 pr-3">{v.power ?? '—'}</td>
                    <td className="py-1 pr-3">{v.pp ?? '—'}</td>
                    <td className="py-1 pr-3">{v.accuracy ?? '—'}</td>
                    <td className="py-1 pr-3">{typeLabel(v.typeId)}</td>
                    <td className="py-1 pr-3">{damageClassLabel(v.damageClassId)}</td>
                    <td className="py-1 pr-3">{v.isUsable ? '✓' : '✕'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {svMismatch ? (
              <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                ⚠ SV(vg21) 값이 master와 다릅니다. master는 SV 기준값을 유지해야 합니다.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
