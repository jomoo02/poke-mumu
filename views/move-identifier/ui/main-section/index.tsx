import { DamageClassBadge } from '@/entities/damage-class/ui';
import { Move } from '@/entities/move/model';
import { TypeBadge } from '@/entities/type/ui';
import {
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
} from '@/shared/ui/page-layout';
interface MoveSectionProps {
  move: Move;
}

export default function MainSection({ move }: MoveSectionProps) {
  const appearedText = `${move.generation}세대`;
  const power = move.power ? `${move.power}` : '-';
  const accuracy = move.accuracy ? `${move.accuracy}` : '-';
  const pp = move.pp ? `${move.pp}` : '-';
  const priority = move.priority ?? 0;

  return (
    <PageLayoutHeader>
      <PageLayoutHeaderTitle>{move.nameKo}</PageLayoutHeaderTitle>
      <PageLayoutHeaderDescription className="text-foreground text-lg">
        {`${move.nameEn} / ${move.nameJa}`}
      </PageLayoutHeaderDescription>
      <PageLayoutHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
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
            <div className="text-pretty break-keep">{move.description}</div>
          </div>
          <div className="md:flex h-full justify-center items-end">
            <div className="grid grid-cols-3  gap-x-3 gap-y-3">
              <Info3 title="위력">{power}</Info3>
              <Info3 title="명중률">{accuracy}</Info3>
              <Info3 title="PP">{pp}</Info3>
              <Info3 title="우선도">{priority}</Info3>
              <Info3 title="첫 등장">{appearedText}</Info3>
            </div>
          </div>
        </div>
      </PageLayoutHeader>
    </PageLayoutHeader>
  );
}
interface InfoProps {
  title: string;
  children: React.ReactNode;
}

function Info3({ title, children }: InfoProps) {
  return (
    <div className="flex flex-col bg-muted/70 md:w-26 border border-transparent h-20 gap-0.5 justify-center rounded-xl items-center">
      <div className="text-foreground/70 text-cenr text-sm font-medium">
        {title}
      </div>
      <div className="text-cenr font-medium">{children}</div>
    </div>
  );
}
