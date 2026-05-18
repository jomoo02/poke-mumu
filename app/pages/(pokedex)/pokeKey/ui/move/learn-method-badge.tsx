// app/pages/(pokedex)/pokeKey/ui/move/learn-method-badge.tsx
import { cn } from '@/app/shared/lib/cn';

const LEARN_METHOD_STYLES: Record<string, string> = {
  'level-up': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  machine: 'bg-sky-100 text-sky-800 border-sky-200',
  tutor: 'bg-violet-100 text-violet-800 border-violet-200',
  egg: 'bg-amber-100 text-amber-800 border-amber-200',
  evolution: 'bg-pink-100 text-pink-800 border-pink-200',
  'pre-evolution': 'bg-slate-100 text-slate-700 border-slate-200',
  reminder: 'bg-slate-100 text-slate-700 border-slate-200',
  'form-change': 'bg-slate-100 text-slate-700 border-slate-200',
  special: 'bg-slate-100 text-slate-700 border-slate-200',
};

interface LearnMethodBadgeProps {
  identifier: string;
  nameKo: string;
  level?: number | null;
  machineType?: string | null;
  machineNumber?: number | null;
}

export default function LearnMethodBadge({
  identifier,
  nameKo,
  level,
  machineType,
  machineNumber,
}: LearnMethodBadgeProps) {
  const colorClass =
    LEARN_METHOD_STYLES[identifier] ?? LEARN_METHOD_STYLES.special;

  // 표시 라벨 결정
  let label = nameKo;
  if (identifier === 'level-up' && level != null) {
    label = `Lv.${level}`;
  } else if (identifier === 'machine' && machineType && machineNumber != null) {
    label = `${machineType}${String(machineNumber).padStart(2, '0')}`;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap',
        colorClass,
      )}
    >
      {label}
    </span>
  );
}
