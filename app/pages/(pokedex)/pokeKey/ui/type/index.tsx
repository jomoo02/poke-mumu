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

export default function Type({ typeDefenseGroups }: TypeProps) {
  return (
    <div>
      {/* {JSON.stringify(typeDefenseGroups)} */}
      <Section className="">
        {/* <SectionBorder /> */}
        <SectionTitle>타입</SectionTitle>
        <SectionDescription>타입</SectionDescription>
        <SectionContent>
          {' '}
          <TypeDefenseList typeDefenseGroups={typeDefenseGroups} />
        </SectionContent>
      </Section>
    </div>
  );
}
