import { cn } from '@/_shared/lib/cn';
import { getPokeTypes, type Poke } from '@/_entities/poke';
import { TypeIcon } from '@/_entities/type';

interface PokeTypesProps {
  poke: Pick<Poke, 'type1' | 'type2'>;
  className?: string;
}

// 타입 아이콘 1~2개 (테이블·리스트). 아이콘의 대체 텍스트가 타입 이름이다.
// 단일 타입도 두 칸 폭을 잡아(grid-cols-2) 위아래 행의 첫째 타입이 열처럼 맞는다
export default function PokeTypes({ poke, className }: PokeTypesProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-1', className)}>
      {getPokeTypes(poke).map((type) => (
        <TypeIcon key={type.identifier} type={type} />
      ))}
    </div>
  );
}
