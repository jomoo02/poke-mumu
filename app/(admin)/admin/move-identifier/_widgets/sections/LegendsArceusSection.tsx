'use client';

import { useState, useTransition } from 'react';
import { Badge, Button, Field, Input, Select, Textarea, useToast } from '../../_shared/ui';
import { DAMAGE_CLASS_OPTIONS, TYPE_OPTIONS } from '../../_shared/pokemon/moveEnums';
import type {
  LaTriple,
  LegendsArceusRow,
  MoveMaster,
} from '../../_entities/move/types';
import { upsertLegendsArceus } from '../../_features/legends-arceus/actions';

type TripleStr = { standard: string; agile: string; strong: string };

interface FormState {
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  typeId: string;
  damageClassId: string;
  pp: string;
  description: string;
  effectNote: string;
  power: TripleStr;
  accuracy: TripleStr;
  actionSpeedSelf: TripleStr;
  actionSpeedTarget: TripleStr;
  effectChance: TripleStr;
  effectTurns: TripleStr;
  effectRecoil: TripleStr;
  effectHeal: TripleStr;
}

type TripleKey =
  | 'power'
  | 'accuracy'
  | 'actionSpeedSelf'
  | 'actionSpeedTarget'
  | 'effectChance'
  | 'effectTurns'
  | 'effectRecoil'
  | 'effectHeal';

function s(v: number | string | null | undefined): string {
  return v === null || v === undefined ? '' : String(v);
}

function tripleStr(t: LaTriple): TripleStr {
  return { standard: s(t.standard), agile: s(t.agile), strong: s(t.strong) };
}

const EMPTY_TRIPLE: TripleStr = { standard: '', agile: '', strong: '' };

function fromRow(r: LegendsArceusRow): FormState {
  return {
    identifier: r.identifier,
    nameKo: s(r.nameKo),
    nameEn: s(r.nameEn),
    nameJa: s(r.nameJa),
    typeId: s(r.typeId),
    damageClassId: s(r.damageClassId),
    pp: s(r.pp),
    description: s(r.description),
    effectNote: s(r.effectNote),
    power: tripleStr(r.power),
    accuracy: tripleStr(r.accuracy),
    actionSpeedSelf: tripleStr(r.actionSpeedSelf),
    actionSpeedTarget: tripleStr(r.actionSpeedTarget),
    effectChance: tripleStr(r.effectChance),
    effectTurns: tripleStr(r.effectTurns),
    effectRecoil: tripleStr(r.effectRecoil),
    effectHeal: tripleStr(r.effectHeal),
  };
}

/** 없을 때 삽입용 빈폼(master 일부 프리필). */
function blankForm(m: MoveMaster): FormState {
  return {
    identifier: m.identifier,
    nameKo: m.nameKo,
    nameEn: m.nameEn,
    nameJa: m.nameJa,
    typeId: s(m.typeId),
    damageClassId: s(m.damageClassId),
    pp: s(m.pp),
    description: s(m.description),
    effectNote: '',
    power: { ...EMPTY_TRIPLE },
    accuracy: { ...EMPTY_TRIPLE },
    actionSpeedSelf: { ...EMPTY_TRIPLE },
    actionSpeedTarget: { ...EMPTY_TRIPLE },
    effectChance: { ...EMPTY_TRIPLE },
    effectTurns: { ...EMPTY_TRIPLE },
    effectRecoil: { ...EMPTY_TRIPLE },
    effectHeal: { ...EMPTY_TRIPLE },
  };
}

export function LegendsArceusSection({
  master,
  identifier,
  initial,
}: {
  master: MoveMaster;
  identifier: string;
  initial: LegendsArceusRow | null;
}) {
  const toast = useToast();
  const [form, setForm] = useState<FormState | null>(initial ? fromRow(initial) : null);
  const [exists, setExists] = useState(initial !== null);
  const [dirty, setDirty] = useState(false);
  const [pending, startTransition] = useTransition();

  function setBasic<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    setDirty(true);
  }

  function setTriple(key: TripleKey, col: keyof TripleStr, value: string) {
    setForm((prev) =>
      prev ? { ...prev, [key]: { ...prev[key], [col]: value } } : prev,
    );
    setDirty(true);
  }

  function save() {
    if (!form) return;
    startTransition(async () => {
      const result = await upsertLegendsArceus(
        {
          baseMoveId: master.id,
          identifier: form.identifier,
          nameKo: form.nameKo,
          nameEn: form.nameEn,
          nameJa: form.nameJa,
          typeId: form.typeId,
          damageClassId: form.damageClassId,
          pp: form.pp,
          description: form.description,
          effectNote: form.effectNote,
          power: form.power,
          accuracy: form.accuracy,
          actionSpeedSelf: form.actionSpeedSelf,
          actionSpeedTarget: form.actionSpeedTarget,
          effectChance: form.effectChance,
          effectTurns: form.effectTurns,
          effectRecoil: form.effectRecoil,
          effectHeal: form.effectHeal,
        },
        identifier,
      );
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '저장 실패');
        return;
      }
      setExists(true);
      setDirty(false);
      toast('success', 'Legends Arceus 저장됨');
    });
  }

  const tripleRow = (label: string, key: TripleKey, hint?: string) =>
    form ? (
      <div className="grid grid-cols-[10rem_1fr_1fr_1fr] items-center gap-2">
        <span className="text-sm text-muted-foreground" title={hint}>
          {label}
        </span>
        {(['standard', 'agile', 'strong'] as const).map((col) => (
          <Input
            key={col}
            type="number"
            placeholder={col}
            value={form[key][col]}
            onChange={(e) => setTriple(key, col, e.target.value)}
          />
        ))}
      </div>
    ) : null;

  return (
    <section
      className={
        'rounded-xl border bg-card p-4 shadow-sm sm:p-5 ' +
        (dirty ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-border')
      }
    >
      <header className="mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">
          Legends Arceus (version_move_legends_arceus)
        </h2>
        {exists ? <Badge tone="info">존재</Badge> : <Badge>미생성</Badge>}
        {dirty ? <Badge tone="warn">수정됨</Badge> : null}
      </header>

      {form === null ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            LA 행이 없습니다. 빈 폼으로 삽입할 수 있습니다(identifier·이름·타입 등 master
            프리필).
          </p>
          <Button
            onClick={() => {
              setForm(blankForm(master));
              setDirty(true);
            }}
          >
            삽입 폼 열기
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="identifier">
              <Input value={form.identifier} onChange={(e) => setBasic('identifier', e.target.value)} />
            </Field>
            <Field label="name_ko">
              <Input value={form.nameKo} onChange={(e) => setBasic('nameKo', e.target.value)} />
            </Field>
            <Field label="name_en">
              <Input value={form.nameEn} onChange={(e) => setBasic('nameEn', e.target.value)} />
            </Field>
            <Field label="name_ja">
              <Input value={form.nameJa} onChange={(e) => setBasic('nameJa', e.target.value)} />
            </Field>
            <Field label="type">
              <Select value={form.typeId} onChange={(e) => setBasic('typeId', e.target.value)}>
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
                onChange={(e) => setBasic('damageClassId', e.target.value)}
              >
                <option value="">—</option>
                {DAMAGE_CLASS_OPTIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="pp" hint="빈값 = null">
              <Input type="number" value={form.pp} onChange={(e) => setBasic('pp', e.target.value)} />
            </Field>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
            <div className="grid grid-cols-[10rem_1fr_1fr_1fr] gap-2 text-sm font-medium text-muted-foreground">
              <span>3열 매트릭스</span>
              <span>standard</span>
              <span>agile</span>
              <span>strong</span>
            </div>
            {tripleRow('power', 'power')}
            {tripleRow('accuracy', 'accuracy', '— = 항상명중')}
            {tripleRow('action_speed_self', 'actionSpeedSelf')}
            {tripleRow('action_speed_target', 'actionSpeedTarget')}
            {tripleRow('effect_chance', 'effectChance', '확률효과일 때 채움')}
            {tripleRow('effect_turns', 'effectTurns', '확정효과일 때 채움(chance=null)')}
            {tripleRow('effect_recoil', 'effectRecoil')}
            {tripleRow('effect_heal', 'effectHeal')}
          </div>

          <Field label="effect_note (en)" hint="확정효과 → chance=null·turns만 / 확률효과 → chance 채움">
            <Textarea value={form.effectNote} onChange={(e) => setBasic('effectNote', e.target.value)} />
          </Field>
          <Field label="description">
            <Textarea value={form.description} onChange={(e) => setBasic('description', e.target.value)} />
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
