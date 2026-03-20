import { XIcon } from 'lucide-react';

import { type Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';

interface TypePillListProps {
  types: Type[];
  onRemove: (type: Type) => void;
}

export default function TypePillList({ types, onRemove }: TypePillListProps) {
  if (types.length === 0) {
    return null;
  }

  return (
    <>
      {types.map((type) => (
        <Button
          key={type.identifier}
          variant={'secondary'}
          onClick={() => onRemove(type)}
        >
          {type.name}
          <XIcon className="size-3.5" />
        </Button>
      ))}
    </>
  );
}
