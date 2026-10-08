import { cn } from '@/_shared/lib/cn';

import type { Type } from '../model/type';
import { TypeIcon } from './type-icon';

interface TypeIconLabelProps {
  type: Pick<Type, 'identifier' | 'nameKo'>;
  className?: string;
}

// 아이콘 아래에 타입 이름. 이름 글자가 보이므로 아이콘은 장식으로 둔다
export function TypeIconLabel({ type, className }: TypeIconLabelProps) {
  return (
    <div className={cn('flex flex-col items-center gap-1.5', className)}>
      <TypeIcon type={type} decorative />
      <span className="max-w-full truncate text-sm text-foreground/70 font-medium">
        {type.nameKo}
      </span>
    </div>
  );
}
