import { PageLayoutSection } from '@/shared/ui/page-layout';
import type { Ability } from '@/entities/ability/model';

interface AbilityInfoProps {
  ability: Ability;
}

export default function AbilityInfo({ ability }: AbilityInfoProps) {
  const appearedText = ability.isChampions ? `챔피언스` : `${ability.gen}세대`;

  return (
    <PageLayoutSection className="mt-0">
      <div className="grid grid-cols-3 xs:flex gap-x-3 flex-wrap gap-y-3">
        <Info title="첫 등장">{appearedText}</Info>
      </div>
      <div className="text-pretty break-keep">{ability.flavorText}</div>
    </PageLayoutSection>
  );
}

interface InfoProps {
  title: string;
  children: React.ReactNode;
}

function Info({ title, children }: InfoProps) {
  return (
    <div className="flex flex-col bg-muted/70 xs:w-24 border border-transparent h-19 gap-0.5 justify-center rounded-xl items-center">
      <div className="text-foreground/70 text-cenr text-sm font-medium">
        {title}
      </div>
      <div className="text-cenr font-medium">{children}</div>
    </div>
  );
}
