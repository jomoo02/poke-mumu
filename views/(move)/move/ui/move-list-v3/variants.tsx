import { Fragment } from 'react';
import Link from 'next/link';

import type { Move } from '@/entities/move/model';
import { TypeBadge, TypeIcon } from '@/entities/type/ui';
import { DamageClassBadge, DamageClassIcon } from '@/entities/damage-class/ui';
import { cn } from '@/shared/lib/cn';

/** 타입 · 분류를 표시하는 방식 */
export type MoveLabelMode = 'icon' | 'text' | 'badge';

interface MoveProps {
  move: Move;
}

interface MoveRowProps extends MoveProps {
  label: MoveLabelMode;
}

const rowClassName = cn(
  'group relative rounded-xl flex flex-col gap-4 py-5',
  'md:py-7',
  '[@media(hover:hover)]:hover:bg-muted/70 -mx-3 px-3',
  'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
  '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[div:hover+&]:before:opacity-0',
  'has-[a:focus-visible]:before:opacity-0 [div:has(a:focus-visible)+&]:before:opacity-0',
);

const gridRowClassName = cn(rowClassName, 'md:grid md:grid-cols-8 md:gap-6');

function MoveLink({ move }: MoveProps) {
  return (
    <Link
      href={`/move/${move.identifier}`}
      className={cn(
        'font-semibold break-keep text-lg',
        'outline-none after:absolute after:inset-0 after:rounded-xl',
        'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
      )}
    >
      {move.nameKo}
    </Link>
  );
}

function MoveNames({ move }: MoveProps) {
  return (
    <div className="flex flex-col gap-1">
      <MoveLink move={move} />
      <p className="text-sm break-keep text-foreground/70">
        <span>{move.nameEn}</span>
        {' / '}
        <span>{move.nameJa}</span>
      </p>
    </div>
  );
}

function MoveDescription({ move }: MoveProps) {
  return (
    <p className="leading-relaxed break-keep text-pretty text-foreground/70">
      {move.description}
    </p>
  );
}

/** 타입 · 분류 그룹: 아이콘 / 텍스트 / 뱃지 중 하나로만 표시 */
function MoveTypeLabels({
  move,
  label,
  className,
}: MoveRowProps & { className?: string }) {
  const type = { identifier: move.typeIdentifier, nameKo: move.typeNameKo };
  const damageClass = {
    identifier: move.damageClassIdentifier,
    nameKo: move.damageClassNameKo,
  };

  if (label === 'text') {
    return (
      <p
        className={cn(
          'flex shrink-0 items-center gap-x-1.5 text-sm font-medium break-keep',
          className,
        )}
      >
        <span>{type.nameKo}</span>
        <span aria-hidden className="text-foreground/40">
          ·
        </span>
        <span>{damageClass.nameKo}</span>
      </p>
    );
  }

  if (label === 'badge') {
    return (
      <div className={cn('flex shrink-0 gap-x-1.5', className)}>
        <TypeBadge size="small" type={type} />
        <DamageClassBadge
          className="w-18.5 h-7 [&_span]:text-xs"
          damageClass={damageClass}
        />
      </div>
    );
  }

  return (
    <div className={cn('flex shrink-0 gap-x-1.5', className)}>
      <TypeIcon type={type} />
      <DamageClassIcon damageClass={damageClass} />
    </div>
  );
}

const getStats = (move: Move) => [
  { subject: '위력', value: move.power },
  { subject: '명중', value: move.accuracy },
  { subject: 'PP', value: move.pp },
];

/** 라벨 · 값을 한 줄로 늘어놓은 스탯 */
function InlineStats({ move, className }: MoveProps & { className?: string }) {
  return (
    <dl className={cn('flex gap-x-4 text-sm tabular-nums', className)}>
      {getStats(move).map(({ subject, value }) => (
        <div key={subject} className="flex items-center gap-x-1.5">
          <dt className="text-foreground/70">{subject}</dt>
          <dd className="font-medium">{value ?? '-'}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 가운뎃점으로 구분한 촘촘한 스탯 */
function DottedStats({ move, className }: MoveProps & { className?: string }) {
  return (
    <dl className={cn('flex items-center gap-x-2 text-sm tabular-nums', className)}>
      {getStats(move).map(({ subject, value }, idx) => (
        <Fragment key={subject}>
          {idx > 0 && (
            <span aria-hidden className="text-foreground/40">
              ·
            </span>
          )}
          <div className="flex items-center gap-x-1">
            <dt className="text-foreground/70">{subject}</dt>
            <dd className="font-medium">{value ?? '-'}</dd>
          </div>
        </Fragment>
      ))}
    </dl>
  );
}

function Divider() {
  return <span aria-hidden className="h-4 w-px bg-border" />;
}

/** 타입 · 분류 | 스탯 */
function MetaLine({
  move,
  label,
  className,
}: MoveRowProps & { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
      <MoveTypeLabels move={move} label={label} />
      <Divider />
      <InlineStats move={move} />
    </div>
  );
}

/** C. 메타 줄을 설명 위에 배치 */
export function MoveRowC({ move, label }: MoveRowProps) {
  return (
    <div className={gridRowClassName}>
      <div className="md:col-span-2">
        <MoveNames move={move} />
      </div>
      <div className="flex flex-col gap-3 md:col-span-6">
        <MetaLine move={move} label={label} />
        <MoveDescription move={move} />
      </div>
    </div>
  );
}

/** C-1. 메타 줄을 이름 아래 좌측 열로 옮기고 설명은 우측 전체 사용 */
export function MoveRowC1({ move, label }: MoveRowProps) {
  return (
    <div className={gridRowClassName}>
      <div className="flex flex-col gap-2.5 md:col-span-3">
        <MoveNames move={move} />
        <MetaLine move={move} label={label} className="gap-x-3" />
      </div>
      <div className="md:col-span-5">
        <MoveDescription move={move} />
      </div>
    </div>
  );
}

/** C-2. 설명을 먼저 읽고 메타 줄은 설명 아래 */
export function MoveRowC2({ move, label }: MoveRowProps) {
  return (
    <div className={gridRowClassName}>
      <div className="md:col-span-2">
        <MoveNames move={move} />
      </div>
      <div className="flex flex-col gap-3 md:col-span-6">
        <MoveDescription move={move} />
        <MetaLine move={move} label={label} />
      </div>
    </div>
  );
}

/** C-3. 2열 없이 이름과 메타 줄을 한 줄 양 끝에 두고, 설명은 아래 전체 폭 */
export function MoveRowC3({ move, label }: MoveRowProps) {
  return (
    <div className={cn(rowClassName, 'md:gap-3')}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
        <MoveNames move={move} />
        <MetaLine move={move} label={label} className="md:pt-0.5" />
      </div>
      <MoveDescription move={move} />
    </div>
  );
}

/** C-4. 메타 줄을 두 줄(타입 · 분류 / 스탯)로 나눠 이름 아래 좌측 열에 쌓음 */
export function MoveRowC4({ move, label }: MoveRowProps) {
  return (
    <div className={gridRowClassName}>
      <div className="flex flex-col gap-3 md:col-span-3">
        <MoveNames move={move} />
        <div className="flex flex-col gap-2">
          <MoveTypeLabels move={move} label={label} />
          <InlineStats move={move} />
        </div>
      </div>
      <div className="md:col-span-5">
        <MoveDescription move={move} />
      </div>
    </div>
  );
}

/** C-5. 메타 줄을 옅은 배경 띠로 감싸 설명 위에 배치, 스탯은 가운뎃점 구분 */
export function MoveRowC5({ move, label }: MoveRowProps) {
  return (
    <div className={gridRowClassName}>
      <div className="md:col-span-2">
        <MoveNames move={move} />
      </div>
      <div className="flex flex-col gap-3 md:col-span-6">
        <div
          className={cn(
            'flex w-fit flex-wrap items-center gap-x-3 gap-y-2 rounded-lg bg-muted px-3 py-2',
            '[@media(hover:hover)]:group-hover:bg-background',
          )}
        >
          <MoveTypeLabels move={move} label={label} />
          <Divider />
          <DottedStats move={move} />
        </div>
        <MoveDescription move={move} />
      </div>
    </div>
  );
}

/** C-6. 설명 위 메타 줄에서 타입 · 분류는 왼쪽, 스탯은 오른쪽 끝으로 벌림 */
export function MoveRowC6({ move, label }: MoveRowProps) {
  return (
    <div className={gridRowClassName}>
      <div className="md:col-span-2">
        <MoveNames move={move} />
      </div>
      <div className="flex flex-col gap-3 md:col-span-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <MoveTypeLabels move={move} label={label} />
          <InlineStats move={move} />
        </div>
        <MoveDescription move={move} />
      </div>
    </div>
  );
}
