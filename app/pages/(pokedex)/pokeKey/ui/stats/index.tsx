import { getStats } from '@/app/entities/stat/api';

import { EffortValueView, type BaseStatsView } from '../../model';
import BaseStats from './base-stats';
import EffortValues from './effort-values';
import { Stat } from '@/app/entities/stat/model';
import {
  Section,
  SectionBorder,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from '../section';

interface StatsProps {
  baseStats: BaseStatsView;
  effortValues: EffortValueView[];
  statRows: Stat[];
  name: string;
}

export default async function Stats({
  baseStats,
  effortValues,
  statRows,
  name,
}: StatsProps) {
  // const statLabels = await getStats();
  const sectionDescription = `${name}의 스탯`;
  return (
    <Section>
      <SectionBorder />
      <SectionTitle>스탯</SectionTitle>
      <SectionDescription>{sectionDescription}</SectionDescription>
      <SectionContent>
        <div className="@container">
          <div className="grid lg:grid-cols-1 gap-y-6 gap-x-6">
            <div className="lg:col-span-1">
              <BaseStats baseStats={baseStats} statRows={statRows} />
            </div>

            {/* <div className="">
              <EffortValues effortValues={effortValues} statRows={statRows} />
            </div> */}
          </div>
        </div>
      </SectionContent>
    </Section>
  );
}
