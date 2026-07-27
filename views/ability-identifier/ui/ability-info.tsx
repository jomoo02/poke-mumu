import { PageLayoutSection } from '@/shared/ui/page-layout';
import type { Ability } from '@/entities/ability/model';

interface AbilityInfoProps {
  ability: Ability;
}

export default function AbilityInfo({ ability }: AbilityInfoProps) {
  const appearedText = ability.isChampions
    ? `${ability.gen}세대, 챔피언스`
    : `${ability.gen}세대`;

  return (
    <PageLayoutSection className="">
      <Info title="첫 등장">{appearedText}</Info>
    </PageLayoutSection>
  );
}

interface InfoProps {
  title: string;
  children: React.ReactNode;
}

function Info({ title, children }: InfoProps) {
  return (
    <div className="flex flex-col">
      <div className="text-muted-foreground font-medium text-md">{title}</div>
      <div className="text-lg">{children}</div>
    </div>
  );
}
