import { TypeDefenseGroupsView } from '../../model';
import {
  Section,
  SectionBorder,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from '../section';
import TypeDefenseList from './type-defense-list';

interface TypeProps {
  typeDefenseGroups: TypeDefenseGroupsView;
}

export default function TypeV2({ typeDefenseGroups }: TypeProps) {
  return (
    <>
      <TypeDefenseList typeDefenseGroups={typeDefenseGroups} />
    </>
  );
}
