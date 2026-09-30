'use client';

import { useState, useTransition } from 'react';
import { Badge, Button, Field, Input, Select, Textarea, cn, useToast } from '../../_shared/ui';
import { DAMAGE_CLASS_OPTIONS, TYPE_OPTIONS } from '../../_shared/pokemon/moveEnums';
import {
  ZA_LEGACY_OFFSET,
  ZA_MACHINE_TYPES,
  ZA_VARIANTS,
  type ZaVariant,
} from '../../_shared/pokemon/moveTarget';
import type { LegendsZaRow, MoveMaster } from '../../_entities/move/types';
import {
  applyZaSharedEffect,
  upsertLegendsZa,
} from '../../_features/legends-za/actions';

interface FormState {
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  description: string;
  typeId: string;
  damageClassId: string;
  power: string;
  cooldown: string;
  pp: string;
  duration: string;
  framesWindUp: string;
  framesExec: string;
  rangeMin: string;
  rangeMax: string;
  rangeEff: string;
  machineType: string;
  machineNumber: string;
  effectChance: string;
  effectRecoil: string;
  effectHeal: string;
}

function s(v: number | string | null | undefined): string {
  return v === null || v === undefined ? '' : String(v);
}

function fromRow(r: LegendsZaRow): FormState {
  return {
    identifier: r.identifier,
    nameKo: r.nameKo,
    nameEn: r.nameEn,
    nameJa: r.nameJa,
    description: r.description,
    typeId: s(r.typeId),
    damageClassId: s(r.damageClassId),
    power: s(r.power),
    cooldown: s(r.cooldown),
    pp: s(r.pp),
    duration: s(r.duration),
    framesWindUp: s(r.framesWindUp),
    framesExec: s(r.framesExec),
    rangeMin: s(r.rangeMin),
    rangeMax: s(r.rangeMax),
    rangeEff: s(r.rangeEff),
    machineType: s(r.machineType),
    machineNumber: s(r.machineNumber),
    effectChance: s(r.effectChance),
    effectRecoil: s(r.effectRecoil),
    effectHeal: s(r.effectHeal),
  };
}

function blankForm(m: MoveMaster): FormState {
  return {
    identifier: m.identifier,
    nameKo: m.nameKo,
    nameEn: m.nameEn,
    nameJa: m.nameJa,
    description: s(m.description),
    typeId: s(m.typeId),
    damageClassId: s(m.damageClassId),
    power: s(m.power),
    cooldown: '',
    pp: s(m.pp),
    duration: '',
    framesWindUp: '',
    framesExec: '',
    rangeMin: '',
    rangeMax: '',
    rangeEff: '',
    machineType: '',
    machineNumber: '',
    effectChance: s(m.effectChance),
    effectRecoil: '',
    effectHeal: '',
  };
}

type FormMap = Record<ZaVariant, FormState | null>;
type BoolMap = Record<ZaVariant, boolean>;

export function LegendsZaSection({
  master,
  identifier,
  initial,
}: {
  master: MoveMaster;
  identifier: string;
  initial: LegendsZaRow[];
}) {
  const toast = useToast();
  const [pending, startTransition] = useTransition();

  const initForms: FormMap = { base: null, plus: null, rogue: null };
  const initExists: BoolMap = { base: false, plus: false, rogue: false };
  for (const row of initial) {
    initForms[row.zaVariant] = fromRow(row);
    initExists[row.zaVariant] = true;
  }

  const [forms, setForms] = useState<FormMap>(initForms);
  const [existsMap, setExistsMap] = useState<BoolMap>(initExists);
  const [dirtyMap, setDirtyMap] = useState<BoolMap>({
    base: false,
    plus: false,
    rogue: false,
  });
  const [active, setActive] = useState<ZaVariant>(
    initial[0]?.zaVariant ?? 'base',
  );
  const [applyAll, setApplyAll] = useState(false);

  const form = forms[active];

  function set<K extends keyof FormState>(key: K, value: string) {
    setForms((prev) => {
      const f = prev[active];
      if (!f) return prev;
      return { ...prev, [active]: { ...f, [key]: value } };
    });
    setDirtyMap((prev) => ({ ...prev, [active]: true }));
  }

  function openInsert() {
    setForms((prev) => ({ ...prev, [active]: blankForm(master) }));
    setDirtyMap((prev) => ({ ...prev, [active]: true }));
  }

  const legacyPreview =
    master.moveNumber !== null
      ? master.moveNumber + ZA_LEGACY_OFFSET[active]
      : null;

  function save() {
    if (!form) return;
    startTransition(async () => {
      const result = await upsertLegendsZa(
        {
          baseMoveId: master.id,
          zaVariant: active,
          identifier: form.identifier,
          nameKo: form.nameKo,
          nameEn: form.nameEn,
          nameJa: form.nameJa,
          description: form.description,
          typeId: form.typeId,
          damageClassId: form.damageClassId,
          power: form.power,
          cooldown: form.cooldown,
          pp: form.pp,
          duration: form.duration,
          framesWindUp: form.framesWindUp,
          framesExec: form.framesExec,
          rangeMin: form.rangeMin,
          rangeMax: form.rangeMax,
          rangeEff: form.rangeEff,
          machineType: form.machineType,
          machineNumber: form.machineNumber,
          effectChance: form.effectChance,
          effectRecoil: form.effectRecoil,
          effectHeal: form.effectHeal,
        },
        identifier,
      );
      if (!result.ok) {
        toast('error', Object.values(result.errors)[0] ?? '저장 실패');
        return;
      }
      setExistsMap((prev) => ({ ...prev, [active]: true }));
      setDirtyMap((prev) => ({ ...prev, [active]: false }));

      if (applyAll) {
        const shared = await applyZaSharedEffect(
          {
            baseMoveId: master.id,
            effectChance: form.effectChance === '' ? null : Number(form.effectChance),
            effectRecoil: form.effectRecoil === '' ? null : Number(form.effectRecoil),
            effectHeal: form.effectHeal === '' ? null : Number(form.effectHeal),
          },
          identifier,
        );
        if (!shared.ok) {
          toast('error', Object.values(shared.errors)[0] ?? '일괄 적용 실패');
          return;
        }
        // 로컬 폼의 존재 변형들에도 효과값 반영
        setForms((prev) => {
          const next = { ...prev };
          for (const v of ZA_VARIANTS) {
            if (next[v]) {
              next[v] = {
                ...next[v]!,
                effectChance: form.effectChance,
                effectRecoil: form.effectRecoil,
                effectHeal: form.effectHeal,
              };
            }
          }
          return next;
        });
        toast('success', `저장 + 효과값 ${shared.data.updated}개 변형 일괄 적용`);
      } else {
        toast('success', `ZA(${active}) 저장됨`);
      }
    });
  }

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">
          Legends Z-A (version_move_legends_za)
        </h2>
      </header>

      {/* 변형 탭 */}
      <div className="mb-4 flex gap-1">
        {ZA_VARIANTS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setActive(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              active === v
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70',
            )}
          >
            {v}
            {existsMap[v] ? ' ●' : ''}
            {dirtyMap[v] ? ' *' : ''}
          </button>
        ))}
      </div>

      {form === null ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            {active} 변형 행이 없습니다. 삽입할 수 있습니다(필수값 master 프리필,
            legacy_move_id 자동 계산).
          </p>
          <Button onClick={openInsert}>삽입 폼 열기</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge tone="info">version_group 22 (고정)</Badge>
            <Badge>
              legacy_move_id: {legacyPreview ?? '계산불가(move_number 없음)'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="identifier">
              <Input value={form.identifier} onChange={(e) => set('identifier', e.target.value)} />
            </Field>
            <Field label="name_ko *">
              <Input value={form.nameKo} onChange={(e) => set('nameKo', e.target.value)} />
            </Field>
            <Field label="name_en *">
              <Input value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} />
            </Field>
            <Field label="name_ja *">
              <Input value={form.nameJa} onChange={(e) => set('nameJa', e.target.value)} />
            </Field>
            <Field label="type *">
              <Select value={form.typeId} onChange={(e) => set('typeId', e.target.value)}>
                <option value="">—</option>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="damage_class *">
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
            <Field label="power">
              <Input type="number" value={form.power} onChange={(e) => set('power', e.target.value)} />
            </Field>
            <Field label="cooldown">
              <Input type="number" value={form.cooldown} onChange={(e) => set('cooldown', e.target.value)} />
            </Field>
            <Field label="pp">
              <Input type="number" value={form.pp} onChange={(e) => set('pp', e.target.value)} />
            </Field>
            <Field label="duration">
              <Input type="number" value={form.duration} onChange={(e) => set('duration', e.target.value)} />
            </Field>
            <Field label="frames_wind_up">
              <Input type="number" value={form.framesWindUp} onChange={(e) => set('framesWindUp', e.target.value)} />
            </Field>
            <Field label="frames_exec">
              <Input type="number" value={form.framesExec} onChange={(e) => set('framesExec', e.target.value)} />
            </Field>
            <Field label="range_min">
              <Input type="number" value={form.rangeMin} onChange={(e) => set('rangeMin', e.target.value)} />
            </Field>
            <Field label="range_max">
              <Input type="number" value={form.rangeMax} onChange={(e) => set('rangeMax', e.target.value)} />
            </Field>
            <Field label="range_eff">
              <Input type="number" value={form.rangeEff} onChange={(e) => set('rangeEff', e.target.value)} />
            </Field>
            <Field label="machine_type">
              <Select value={form.machineType} onChange={(e) => set('machineType', e.target.value)}>
                <option value="">—</option>
                {ZA_MACHINE_TYPES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="machine_number">
              <Input type="number" value={form.machineNumber} onChange={(e) => set('machineNumber', e.target.value)} />
            </Field>
          </div>

          {/* 기술 고유 효과값 */}
          <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                기술 고유 효과값
              </span>
              <label className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={applyAll}
                  onChange={(e) => setApplyAll(e.target.checked)}
                />
                전 변형 일괄 적용
              </label>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Field label="effect_chance">
                <Input type="number" value={form.effectChance} onChange={(e) => set('effectChance', e.target.value)} />
              </Field>
              <Field label="effect_recoil">
                <Input type="number" value={form.effectRecoil} onChange={(e) => set('effectRecoil', e.target.value)} />
              </Field>
              <Field label="effect_heal">
                <Input type="number" value={form.effectHeal} onChange={(e) => set('effectHeal', e.target.value)} />
              </Field>
            </div>
          </div>

          <Field label="description *">
            <Textarea value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Field>

          <div className="flex justify-end">
            <Button onClick={save} disabled={pending || !dirtyMap[active]}>
              {pending ? '저장 중…' : existsMap[active] ? '수정 저장' : '삽입'}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
