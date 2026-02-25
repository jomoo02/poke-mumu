'use client';

import { memo, useRef } from 'react';

import { cn } from '@/app/shared/lib/cn';
import { Type } from '@/app/entities/type/model';

import { type NationalPokeView, useSortPokedex } from '../model';
import PokeCard from './poke-card';
import SortGroup from './sort-group';
import TypeFilter from './type-filter';
import { useVirtualizer } from '@tanstack/react-virtual';
import PokeCardV2 from './poke-card-v2';

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from '@/app/shared/ui/table';
import { TableVirtuoso } from 'react-virtuoso';
import PokedexTanstack from './pokedex-tanstack';

const Pokedex = memo(function Pokedex({
  pokes,
}: {
  pokes: NationalPokeView[];
}) {
  return (
    <div
      className={cn(
        'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity',
        'group-has-data-[state=pending]:opacity-40 group-has-data-[state=pending]:pointer-events-none',
        'max-w-7xl p-6 px-4 sm:px-6 w-full mx-auto',
      )}
    >
      {pokes.map((poke) => (
        <PokeCard key={poke.id} poke={poke} />
      ))}
    </div>
  );
});

function PokedexV2({ pokes }: { pokes: NationalPokeView[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: pokes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    overscan: 20,
  });
  const items = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className=" overflow-y-auto h-[calc(75vh-100px)] w-full"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          // position: 'relative',
        }}
      >
        <div className="h-[500px] overflow-auto">
          <table className="w-full">
            <TableHeader>
              <TableRow className=" ">
                <TableHead className="sticky top-0 z-10 bg-card">
                  도감번호
                </TableHead>
                <TableHead className="w-[200px] sticky top-0">
                  <button>11</button>
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">
                  타입
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">
                  총합
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">HP</TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">
                  공격
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">
                  방어
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">
                  특수공격
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">
                  특수방어
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card">
                  스피드
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pokes.map((item, index) => (
                <TableRow
                  // key={item.key}
                  key={item.pokeKey}
                  data-index={index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    // height: `${item.size}px`,
                    // transform: `translateY(${item.start - index * item.size}px)`,
                  }}
                  // ref={virtualizer.measureElement}
                  className={
                    cn()
                    // 'relative border-0 after:absolute after:top-0 after:left-0 after:z-10 after:w-full after:border-b after:border-line-200',
                  }
                >
                  <PokeCardV2 poke={item} />
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PokedexV3({ pokes }: { pokes: NationalPokeView[] }) {
  return (
    <TableVirtuoso
      className="w-full"
      style={{ height: '100%' }}
      data={pokes}
      // components={{
      //   Table: ({ style, ...props }) => (
      //     <table {...props} style={{ ...style, width: '100%' }} />
      //   ),
      // }}
      // useWindowScroll
      fixedHeaderContent={() => (
        <TableRow className="bg-card">
          <TableHead className="w-44 min-w-44">도감번호</TableHead>
          <TableHead className="w-full">
            <button>11</button>
          </TableHead>
          <TableHead className="w-28 min-w-28">타입</TableHead>
          <TableHead className="w-24 min-w-24">총합</TableHead>
          <TableHead className="w-24 min-w-24">HP</TableHead>
          <TableHead className="w-24 min-w-24">공격</TableHead>
          <TableHead className="w-24 min-w-24">방어</TableHead>
          <TableHead className="w-24 min-w-24">특수공격</TableHead>
          <TableHead className="w-24 min-w-24">특수방어</TableHead>
          <TableHead className="w-24 min-w-24">스피드</TableHead>
        </TableRow>
      )}
      itemContent={(index, user) => (
        <>
          <PokeCardV2 poke={user} />
        </>
      )}
    />
  );
}

function PokedexV4({ pokes }: { pokes: NationalPokeView[] }) {
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="bg-card ">
          <TableHead className="w-44 min-w-44 sticky top-14  bg-accent">
            도감번호
          </TableHead>
          <TableHead className="w-full sticky top-14  bg-accent">
            <button>11</button>
          </TableHead>
          <TableHead className="w-28 min-w-28 sticky top-14  bg-accent">
            타입
          </TableHead>
          <TableHead className="w-24 min-w-24 sticky top-14  bg-accent">
            총합
          </TableHead>
          <TableHead className="w-24 min-w-24 sticky top-14  bg-accent">
            HP
          </TableHead>
          <TableHead className="w-24 min-w-24 sticky top-14  bg-accent">
            공격
          </TableHead>
          <TableHead className="w-24 min-w-24 sticky top-14  bg-accent">
            방어
          </TableHead>
          <TableHead className="w-24 min-w-24 sticky top-14  bg-accent">
            특수공격
          </TableHead>
          <TableHead className="w-24 min-w-24 sticky top-14  bg-accent">
            특수방어
          </TableHead>
          <TableHead className="w-24 min-w-24 sticky top-14  bg-accent">
            스피드
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokes.map((poke) => (
          <TableRow key={poke.pokeKey}>
            <PokeCardV2 poke={poke} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function NationalDex({
  pokes,
  types,
}: {
  pokes: NationalPokeView[];
  types: Type[];
}) {
  const {
    handleChangeFilterType,
    handleChangeSortKey,
    sortedPokes,
    filterType,
    direction,
    sortKey,
    isStale,
  } = useSortPokedex(pokes);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (!headerRef.current || !bodyRef.current) return;
    headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
  };
  return (
    <div>
      <div
        className={cn(
          isStale ? ' opacity-50 ' : '',
          'transition duration-300 max-w-7xl sticky top-14 bg-card z-20 w-full mx-auto px-4 sm:px-6 py-2',
        )}
      >
        <div className="text-sm font-medium py-1">타입</div>
        <TypeFilter
          types={types}
          onChangeType={handleChangeFilterType}
          selectedType={filterType}
        />
      </div>

      {/* <div
        className={cn(
          isStale ? ' opacity-50 ' : '',
          'transition duration-300 max-w-7xl w-full mx-auto px-4 sm:px-6 py-2',
        )}
      >
        <div className="text-sm font-medium py-1">정렬</div>
        <SortGroup
          onClickSortButton={handleChangeSortKey}
          direction={direction}
          selectedSortKey={sortKey}
        />
      </div> */}

      <div
        className={cn(
          isStale ? ' opacity-50 transition duration-300' : '',
          'transition duration-300',
          'max-w-7xl mx-auto',
          // 'overflow-x-auto',
        )}
      >
        <div
          ref={headerRef}
          className="sticky overflow-hidden top-30 z-10 bg-card"
        >
          {' '}
          <div className="flex h-full ">
            <div className="flex items-center justify-center bg-card w-44 min-w-44 px-4 border-b py-4 ">
              도감번호
            </div>
            <div className="w-full min-w-44 px-4 flex items-center border-b py-4 ">
              <button>이름</button>
            </div>
            <div className=" w-32 min-w-32 px-4 flex justify-center text-nowrap border-b py-4">
              타입
            </div>
            <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap border-b py-4">
              총합
            </div>
            <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap border-b py-4">
              HP
            </div>
            <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap border-b py-4">
              공격
            </div>
            <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap border-b py-4">
              방어
            </div>
            <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap border-b py-4">
              특수공격
            </div>
            <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap border-b py-4">
              특수방어
            </div>
            <div className=" w-28 min-w-28 px-4 flex justify-center text-nowrap border-b py-4">
              스피드
            </div>
          </div>
        </div>

        <PokedexTanstack pokes={pokes} ref={bodyRef} onScroll={handleScroll} />
        {/* <PokedexV2 pokes={sortedPokes} /> */}
      </div>
    </div>
  );
}
