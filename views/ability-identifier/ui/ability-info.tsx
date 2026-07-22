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
    <PageLayoutSection className="flex flex-row gap-x-6 flex-wrap mt-3">
      <Info title="영문" content={ability.nameEn} />
      <Info title="일본어" content={ability.nameJa ?? '-'} />
      <Info title="첫 등장" content={appearedText} />
    </PageLayoutSection>
  );
}

interface InfoProps {
  title: string;
  content: string;
}

function Info({ title, content }: InfoProps) {
  return (
    <div className="flex flex-col">
      <div className="text-muted-foreground font-medium text-md">{title}</div>
      <div className="text-lg">{content}</div>
    </div>
  );
}
