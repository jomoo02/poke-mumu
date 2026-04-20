import {
  Section,
  SectionBorder,
  SectionTitle,
  SectionContent,
  SectionDescription,
} from '../section';

import { type StatView } from '../../model';
import BaseStats from './base-stats';
import LevelStats from './level-stats';
interface StatsProps {
  stats: StatView[] | null;
  name: string;
}
export default function Stats({ stats, name }: StatsProps) {
  return (
    <Section>
      <SectionBorder />
      <SectionTitle>능력치</SectionTitle>
      <SectionContent className="grid lg:grid-cols-2 gap-6">
        <BaseStats stats={stats} name={name} />
        <LevelStats stats={stats} />
      </SectionContent>
    </Section>
  );
}
