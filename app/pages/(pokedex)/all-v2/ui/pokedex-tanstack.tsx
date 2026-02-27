import {
  elementScroll,
  useVirtualizer,
  useWindowVirtualizer,
  VirtualizerOptions,
  windowScroll,
} from '@tanstack/react-virtual';
import { NationalPokeView } from '../model';
import { formatNumber } from '@/app/shared/lib/format';
import { getStatKeys } from '@/app/entities/stats/model';
import { PokeSprite } from '@/app/entities/poke/ui';
import Link from 'next/link';
import { TypeBadge } from '@/app/entities/type/ui';
import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

function Poke({ poke }: { poke: NationalPokeView }) {
  const {
    name,
    form,
    total,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    type1,
    type2,
    pokeKey,
    dexNumber,
  } = poke;

  const formattedDexNumber = formatNumber(dexNumber);

  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  const statKeys = getStatKeys().filter((statKey) => statKey !== 'total');

  const baseStats = {
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
  };
  return (
    <div className="h-full w-full px-16 mx-auto grid grid-cols-[200px_auto_100px_auto_auto_auto_auto_auto_auto_auto]">
      <div className="h-full  px-4 flex items-center border-b">
        <div className="flex items-center h-full gap-4">
          <PokeSprite poke={poke} className="size-14" />
          {formattedDexNumber}
        </div>
      </div>
      <div className="h-full w-full min-w-44 px-4  border-b flex flex-col justify-center ">
        <Link
          href={href}
          className=""
          aria-label={`${name} 상세 페이지로 이동`}
        >
          <div className="text-foreground min-w-0 truncate font-medium ">
            {name}
          </div>
        </Link>
        <div className="text-muted-foreground text-sm truncate font-medium">
          {form}
        </div>
      </div>
      <div className="grid  px-4 w-25 items-center gap-1 border-b">
        {type1 && <TypeBadge type={type1} className="w-full max-w-17 " />}
        {type2 && <TypeBadge type={type2} className="w-full max-w-17 " />}
      </div>
      <div className="flex items-center px-4  justify-center border-b">
        {total}
      </div>
      {statKeys.map((statKey) => (
        <div
          key={statKey}
          className="flex items-center px-4 justify-center border-b"
        >
          {baseStats[statKey]}
        </div>
      ))}
    </div>
  );
}

function Header() {
  return (
    <div className="flex border-b h-full py-4">
      <div className="flex items-center justify-center bg-card w-44 min-w-44 px-4 ">
        도감번호
      </div>
      <div className="w-full min-w-44 px-4 flex items-center  ">
        <button>이름</button>
      </div>
      <div className=" w-32 min-w-32 px-4 flex justify-center text-nowrap">
        타입
      </div>
      <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap">
        총합
      </div>
      <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap">
        HP
      </div>
      <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap">
        공격
      </div>
      <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap">
        방어
      </div>
      <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap">
        특수공격
      </div>
      <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap">
        특수방어
      </div>
      <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap">
        스피드
      </div>
    </div>
  );
}

const stickyHeight = 72;
const stickyWidth = 150;

export default function PokedexTanstack({
  pokes,
  ref,
  onScroll,
}: {
  pokes: NationalPokeView[];
  ref: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
}) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [scrollMargin, setScrollMargin] = useState(0);
  const scrollingRef = useRef<number>(0);
  // 추가
  useLayoutEffect(() => {
    if (parentRef.current) {
      setScrollMargin(ref.current?.offsetTop ?? 0);
    }
  }, [ref]);

  const scrollToFn: VirtualizerOptions<Window, HTMLDivElement>['scrollToFn'] =
    useCallback((offset, canSmooth, instance) => {
      const run = () => {
        windowScroll(0, canSmooth, instance);
      };

      requestAnimationFrame(run);
    }, []);

  const rowVirtualizer = useWindowVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    // getScrollElement: () => parentRef.current,
    scrollMargin: scrollMargin,
    scrollToFn,
  });

  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
    console.log(pokes);
  }, [pokes]);

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={ref} className=" overflow-auto" onScroll={onScroll}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              transform: `translateY(${
                virtualRow.start - rowVirtualizer.options.scrollMargin
              }px)`,
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
            }}
          >
            <Poke poke={pokes[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
