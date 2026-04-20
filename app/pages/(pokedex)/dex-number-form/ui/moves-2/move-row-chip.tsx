import { type MoveMethod } from '../../model';

const methodChipStyle: Record<MoveMethod, string> = {
  level_up:
    'bg-blue-50 text-blue-700 ring-blue-200 ' +
    ' dark:bg-blue-900/70 dark:text-blue-300 dark:ring-blue-900',
  machine:
    'bg-slate-50 text-slate-700 ring-slate-200 ' +
    'dark:bg-slate-900/70 dark:text-slate-300 dark:ring-slate-700',
  evolution:
    'bg-purple-50 text-purple-700 ring-purple-200 ' +
    'dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900',
  form:
    'bg-pink-50 text-pink-700 ring-pink-200 ' +
    'dark:bg-pink-950/40 dark:text-pink-300 dark:ring-pink-900',
  egg:
    'bg-amber-50 text-amber-700 ring-amber-200 ' +
    'dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900',
  tutor:
    'bg-emerald-50 text-emerald-700 ring-emerald-200 ' +
    'dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  reminder:
    'bg-sky-50 text-sky-700 ring-sky-200 ' +
    'dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900',
  pre:
    'bg-stone-50 text-stone-700 ring-stone-200 ' +
    'dark:bg-stone-800/60 dark:text-stone-400 dark:ring-stone-700',
};

interface MoveRowChipProps {
  method: MoveMethod;
  label: string;
}

export function MoveRowChip({ method, label }: MoveRowChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-2xl px-2 py-0.5 text-xs font-medium ring-1 ring-inset  ${methodChipStyle[method]}`}
    >
      {label}
    </span>
  );
}
