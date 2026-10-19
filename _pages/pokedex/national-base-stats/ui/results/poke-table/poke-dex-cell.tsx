import { PokeSprite, type Poke } from '@/_entities/poke';

interface PokeDexCellProps {
  poke: Pick<Poke, 'dexNumber' | 'sprite' | 'nameKo'>;
}

// 도감 번호 + 스프라이트. 번호를 네 자리로 채워(tabular-nums) 스프라이트가 열처럼 맞는다.
// 이름은 옆 칸에 글자로 있으므로 스프라이트는 장식(alt='')
export default function PokeDexCell({ poke }: PokeDexCellProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-md tabular-nums">
        {String(poke.dexNumber).padStart(4, '0')}
      </span>
      <PokeSprite poke={poke} alt="" className="size-10 shrink-0" />
    </div>
  );
}
