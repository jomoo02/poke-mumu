import { type Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { XIcon } from 'lucide-react';

interface AppliedConditionProps {
  types: Type[];
  onTypeRemove: (type: Type) => void;
}
export default function AppliedCondition({
  types,
  onTypeRemove,
}: AppliedConditionProps) {
  return (
    <div className="px-6 py-4">
      <div className="font-semibold mb-2">적용된 타입</div>
      {types.length > 0 ? (
        <div className="flex gap-2">
          {types.map((type) => (
            <Button
              key={type.identifier}
              variant={'secondary'}
              onClick={() => onTypeRemove(type)}
            >
              {type.name}
              <XIcon className="size-3.5" />
            </Button>
          ))}
        </div>
      ) : (
        <div className=" inline-flex items-center justify-center rounded-lg text-sm bg-secondary h-8 px-2.5">
          모든 타입
        </div>
      )}
    </div>
  );
}
