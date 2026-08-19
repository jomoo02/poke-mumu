'use client';

import { type Type } from '@/entities/type/model';

import TypeFilterDesktop from './desktop';
import { TypeIcon } from '@/entities/type/ui';
import TypeFilterMobile from './mobile';
// import TypeFilterMobile from './mobile';

export interface TypeFilterProps {
  types: Type[];
  max?: number;
  isMobile: boolean;
}

export default function TypeFilter({ types, isMobile }: TypeFilterProps) {
  // return (
  //   <div className="flex flex-col gap-3 @container">
  //     <div className="text-sm font-medium text-foreground/70">타입</div>
  //     <div className="grid grid-cols-6 gap-3 flex-1 @[500px]:grid-cols-9 @[1000px]:grid-cols-18">
  //       {types.map((type) => (
  //         <div
  //           key={type.identifier}
  //           className="flex flex-col items-center gap-1"
  //         >
  //           <TypeIcon type={type} />
  //           <div className="text-xs text-center">{type.nameKo}</div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return isMobile ? (
    <TypeFilterMobile types={types} />
  ) : (
    <TypeFilterDesktop types={types} />
  );
}
