import {
  Section,
  SectionBorder,
  SectionTitle,
  SectionContent,
  SectionDescription,
} from '../section';

import { RankView, type StatView } from '../../model';
import BaseStats from './base-stats';
import LevelStats from './level-stats';
import Ranks from './rank';
import { Type } from '@/app/entities/type/model';
interface StatsProps {
  stats: StatView[] | null;
  name: string;
  ranks: RankView | null;
  types: Type[];
}
export default function Stats({ stats, name, ranks, types }: StatsProps) {
  return (
    <Section>
      <SectionBorder />
      <SectionTitle>능력치</SectionTitle>
      <SectionContent className="grid lg:grid-cols-[2fr_3fr] gap-6">
        <div className="row-span-2">
          <BaseStats stats={stats} name={name} />
        </div>

        <div className="flex flex-col gap-6">
          <LevelStats stats={stats} />
          {ranks && <Ranks ranks={ranks} types={types} />}
        </div>
      </SectionContent>
    </Section>
  );
}
