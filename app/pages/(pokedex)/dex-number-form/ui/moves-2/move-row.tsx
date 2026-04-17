import { TypeIcon } from '@/app/entities/type/ui';
import { DamageClassIcon } from '@/app/entities/damage-class/ui';
import { cn } from '@/app/shared/lib/cn';
import { type MoveViewNew } from '../../model/moves-2';

interface MoveRowProps {
  move: MoveViewNew;
}

export default function MoveRow({ move }: MoveRowProps) {
  const ppOrCooldown =
    move.cooldown != null ? (
      <div className="text-center min-w-10">
        <div className="text-xs text-muted-foreground">재사용</div>
        <div>{move.cooldown}</div>
      </div>
    ) : (
      <div className="text-center min-w-10">
        <div className="text-xs text-muted-foreground">PP</div>
        <div>{move.pp ?? '-'}</div>
      </div>
    );

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 text-sm">
      <div className="shrink-0 min-w-16">
        <span
          className={cn(
            'inline-block py-1 px-2.5 rounded-lg font-medium text-xs',
            move.method === 'level_up'
              ? 'bg-primary/10 text-primary/70'
              : move.method === 'machine'
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted text-muted-foreground',
          )}
        >
          {move.label}
        </span>
      </div>

      <div className="flex-1 min-w-20 font-medium">{move.name}</div>

      <div className="shrink-0">
        <TypeIcon type={move.type} className="size-6.5" />
      </div>

      <div className="shrink-0">
        <DamageClassIcon damageClass={move.damageClass} />
      </div>

      <div className="text-center min-w-10 shrink-0">
        <div className="text-xs text-muted-foreground">위력</div>
        <div>{move.power ?? '-'}</div>
      </div>

      <div className="text-center min-w-10 shrink-0">
        <div className="text-xs text-muted-foreground">명중률</div>
        <div>{move.accuracy != null ? move.accuracy : '-'}</div>
      </div>

      <div className="shrink-0">{ppOrCooldown}</div>

      <div className="flex-2 min-w-32">
        <div className="text-xs text-muted-foreground">설명</div>
        <div className="text-sm leading-relaxed">{move.description}</div>
      </div>
    </div>
  );
}
