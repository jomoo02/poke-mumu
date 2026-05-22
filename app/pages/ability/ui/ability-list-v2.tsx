import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';

import { type AbilityView } from '../model';
import Link from 'next/link';
const getAppeared = (ability: AbilityView) =>
  ability.gen ? `${ability.gen}세대` : '-';
interface AbilityListProps {
  abilities: AbilityView[];
}

export default function AbilityListV2({ abilities }: AbilityListProps) {
  return (
    <div className="">
      <div className="grid-cols-9 gap-x-6 py-3 border-b hidden lg:grid">
        <div className="col-span-2 px-4 text-md">특성</div>
        <div className="col-span-6 px-4 text-md">설명</div>
        <div className="col-span-1 px-4 text-md">등장</div>
      </div>
      {abilities.map((ability) => (
        <Ability key={ability.identifier} ability={ability} />
      ))}
    </div>
  );
}

interface AbilityProps {
  ability: AbilityView;
}

function Ability({ ability }: AbilityProps) {
  return (
    <div>
      {/* lg */}
      <div className="hidden lg:block">
        <Link href={`/ability/${ability.identifier}`} className="group">
          <div className="grid grid-cols-9 gap-x-6 py-3.5 group-hover:bg-muted border-b">
            <div className="col-span-2 px-4 font-medium">{ability.nameKo}</div>
            <div className="col-span-6 px-4">
              <p className="line-clamp-3 whitespace-normal wrap-break-word">
                {ability.flavorText}
              </p>
            </div>
            <div className="col-span-1 px-4">{getAppeared(ability)}</div>
          </div>
        </Link>
      </div>
      {/* mobile */}
      <div className="lg:hidden">
        <Link href={`/ability/${ability.identifier}`} className="group">
          <div className="py-3.5 border-b flex gap-x-6 justify-between">
            <div className="flex flex-col gap-y-1">
              <div className="font-medium">{ability.nameKo}</div>

              <p className="line-clamp-2 whitespace-normal break-keep text-foreground/70 text-md">
                {ability.flavorText}
              </p>
            </div>
            <div className=" flex justify-end shrink-0 text-sm text-foreground/70 h-fit border px-2 rounded-2xl py-0.5 bg-muted">
              {getAppeared(ability)}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
