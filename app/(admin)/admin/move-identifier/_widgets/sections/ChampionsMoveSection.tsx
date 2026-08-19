'use client';

import { useState, useTransition } from 'react';
import { Badge, Button, Field, Input, Select, Textarea, useToast } from '../../_shared/ui';
import { DAMAGE_CLASS_OPTIONS, TYPE_OPTIONS } from '../../_shared/pokemon/moveEnums';
import type { ChampionsMoveRow, MoveMaster } from '../../_entities/move/types';
import { upsertChampionsMove } from '../../_features/champions-move/actions';

interface FormState {
  identifier: string;
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
  description: string;
}

function s(v: number | string | null | undefined): string {
  return v === null || v === undefined ? '' : String(v);
}

function fromRow(row: ChampionsMoveRow): FormState {
  return {
    identifier: row.identifier,
    nameKo: s(row.nameKo),
    nameEn: s(row.nameEn),
    nameJa: s(row.nameJa),
    typeId: s(row.typeId),
    damageClassId: s(row.damageClassId),
    power: s(row.power),
    pp: s(row.pp),
    accuracy: s(row.accuracy),
    priority: s(row.priority),
    effectChance: s(row.effectChance),
    targetId: s(row.targetId),
    description: s(row.description),
  };
}

/** master 프리필: pp만 빈칸(필수 신규 입력). */
function prefillFromMaster(master: MoveMaster): FormState {
  return {
    identifier: master.identifier,
    nameKo: s(master.nameKo),
    nameEn: s(master.nameEn),
    nameJa: s(master.nameJa),
    typeId: s(master.typeId),
    damageClassId: s(master.damageClassId),
    power: s(master.power),
    pp: '',
    accuracy: s(master.accuracy),
    priority: s(master.priority),
    effectChance: s(master.effectChance),
    targetId: s(master.targetId),
    description: s(master.description),
  };
}

export function ChampionsMoveSection({
  master,
  identifier,
  initial,
}: {
  master: MoveMaster;
  identifier: string;
  initial: ChampionsMoveRow | null;
}) {
  const toast = useToast();
  const [form, setForm] = useState<FormState | null>(
    initial ? fromRow(initial) : null,
  );
  const [exists, setExists] = useState<boolean>(initial !== null);
  const [dirty, setDirty] = useState(false);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    setDirty(true);
  }

  function startPrefill() {
    setForm(prefillFromMaster(master));
    setDirty(true);
  }

  function save() {
    if (!form) return;
    startTransition(async () => {
      const result = await upsertChampionsMove(
        {
          baseMoveId: master.id,
          identifier: form.identifier,
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
          description: form.description,
        },
        identifier,
      );
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '저장 실패');
        return;
      }
      setExists(true);
      setDirty(false);
      toast('success', 'Champions 기술 저장됨');
    });
  }

  return (
    <section
      className={
        'rounded-xl border bg-card p-4 shadow-sm sm:p-5 ' +
        (dirty ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-border')
      }
    >
      <header className="mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">
          Champions 기술 (champions_move)
        </h2>
        {exists ? <Badge tone="info">존재</Badge> : <Badge>미생성</Badge>}
        {dirty ? <Badge tone="warn">수정됨</Badge> : null}
      </header>

      {form === null ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            아직 champions_move 행이 없습니다. master 값으로 프리필해 삽입할 수 있습니다
            (pp만 신규 입력).
          </p>
          <Button onClick={startPrefill}>master에서 프리필</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="identifier">
              <Input
                value={form.identifier}
                onChange={(e) => set('identifier', e.target.value)}
              />
            </Field>
            <Field label="name_ko">
              <Input value={form.nameKo} onChange={(e) => set('nameKo', e.target.value)} />
            </Field>
            <Field label="name_en">
              <Input value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} />
            </Field>
            <Field label="name_ja">
              <Input value={form.nameJa} onChange={(e) => set('nameJa', e.target.value)} />
            </Field>
            <Field label="type">
              <Select value={form.typeId} onChange={(e) => set('typeId', e.target.value)}>
                <option value="">—</option>
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
            <Field label="power" hint="빈값 = null">
              <Input
                type="number"
                value={form.power}
                onChange={(e) => set('power', e.target.value)}
              />
            </Field>
            <Field label="pp *필수" hint="Champions 고유 값(신규 입력)">
              <Input
                type="number"
                value={form.pp}
                onChange={(e) => set('pp', e.target.value)}
              />
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
            <Field label="target_id" hint="빈값 = null">
              <Input
                type="number"
                value={form.targetId}
                onChange={(e) => set('targetId', e.target.value)}
              />
            </Field>
          </div>
          <Field label="description">
            <Textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>

          <div className="flex justify-end">
            <Button onClick={save} disabled={pending || !dirty}>
              {pending ? '저장 중…' : exists ? '수정 저장' : '삽입'}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
