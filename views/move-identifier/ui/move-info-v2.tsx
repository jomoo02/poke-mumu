import { DamageClassBadge, DamageClassIcon } from '@/entities/damage-class/ui';
import type { Move } from '@/entities/move/model';
import { TypeBadge, TypeIcon } from '@/entities/type/ui';
import { Card, CardContent, CardGroup } from '@/shared/ui/card';
import { PageLayoutSection } from '@/shared/ui/page-layout';

interface AbilityInfoProps {
  move: Move;
}

export default function MoveInfoV2({ move }: AbilityInfoProps) {
  const appearedText = `${move.generation}세대`;
  const power = move.power ? `${move.power}` : '-';
  const accuracy = move.accuracy ? `${move.accuracy}` : '-';
  const pp = move.pp ? `${move.pp}` : '-';

  return (
    <PageLayoutSection className=" mt-0">
      <div className="flex flex-col gap-6">
        {' '}
        <div className="flex gap-x-3">
          <TypeBadge
            type={{
              identifier: move.typeIdentifier,
              nameKo: move.typeNameKo,
            }}
          />
          <DamageClassBadge
            damageClass={{
              identifier: move.damageClassIdentifier,
              nameKo: move.damageClassNameKo,
            }}
          />
        </div>
        <div className="flex gap-x-3 flex-wrap gap-y-3">
          <Info2 title="위력">{power}</Info2>
          <Info2 title="명중률">{accuracy}</Info2>
          <Info2 title="PP">{pp}</Info2>
          {/* <Info2 title="첫 등장">{appearedText}</Info2> */}
        </div>
        <div className="text-pretty break-keep">{move.description}</div>
      </div>

      {/* </div> */}
    </PageLayoutSection>
  );
}

interface InfoProps {
  title: string;
  children: React.ReactNode;
}

function Info2({ title, children }: InfoProps) {
  return (
    <div className="flex flex-col  w-20">
      <div className="text-foreground/70 text-cenr text-sm font-medium">
        {title}
      </div>
      <div className="text-cenr text-lg">{children}</div>
    </div>
  );
}

function Info({ title, children }: InfoProps) {
  return (
    <div className="flex gap-2.5 px-4 py-2    rounded-4xl items-center">
      <div className="text-foreground/70 text-md font-medium">{`${title}`}</div>
      <div className="font-medium flex-1 text-center text-lg">{children}</div>
    </div>
  );
}
