import { cn } from '@/_shared/lib/cn';

import type { DamageClass } from '../model/damage-class';
import { DamageClassIcon } from './damage-class-icon';

interface DamageClassIconLabelProps {
  damageClass: Pick<DamageClass, 'identifier' | 'nameKo'>;
  className?: string;
}

// 아이콘 아래에 분류 이름. 이름 글자가 보이므로 아이콘은 장식으로 둔다
export function DamageClassIconLabel({
  damageClass,
  className,
}: DamageClassIconLabelProps) {
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <DamageClassIcon damageClass={damageClass} decorative />
      <span className="max-w-full truncate text-xs text-foreground/70">
        {damageClass.nameKo}
      </span>
    </div>
  );
}
