'use client';

import { Fragment } from 'react';

import { TypeBadge } from '@/app/entities/type/ui';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardItem,
  CardGroup,
  CardGroupLabel,
} from '@/app/shared/ui/card';
import { Badge } from '@/app/shared/ui/badge';
import { type Type } from '@/app/entities/type/model';

import { type TypeDefenseView } from '../../model';
import {
  Section,
  SectionBorder,
  SectionTitle,
  SectionDescription,
  SectionContent,
} from '../section';
//s
interface TypeDefensesProps {
  types: Type[];
  typeDefenses: TypeDefenseView[];
  name: string;
}

export default function TypeDefenses({
  typeDefenses,
  types,
  name,
}: TypeDefensesProps) {
  const description = types.map(({ name }) => name).join(', ');

  const groups = [
    {
      label: '약점',
      items: typeDefenses.filter(
        ({ multiple }) => multiple === '4' || multiple === '2',
      ),
    },
    {
      label: '내성',
      items: typeDefenses.filter(
        ({ multiple }) => multiple === '0.5' || multiple === '0.25',
      ),
    },
    {
      label: '무효',
      items: typeDefenses.filter(({ multiple }) => multiple === '0'),
    },
  ].filter(({ items }) => items.length > 0);

  return (
    <Section>
      <SectionBorder />
      <SectionTitle>방어 상성</SectionTitle>
      <SectionDescription>{name} 방어 상성</SectionDescription>
      <SectionContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(({ label, items }) => (
          <Card key={label} className="h-full w-full">
            <CardHeader>
              <CardTitle>{label}</CardTitle>
              <CardDescription>{`${description} 타입의 ${label} 타입 목록`}</CardDescription>
            </CardHeader>
            <CardContent>
              {items.map(({ multiple, description, types, color }, index) => (
                <Fragment key={multiple}>
                  {index > 0 && <div className="w-full h-px bg-border" />}
                  <CardGroup>
                    <CardGroupLabel className="flex gap-1.5 items-center">
                      {`${description}`}
                      <Badge variant={color}>x{multiple}</Badge>
                    </CardGroupLabel>
                    <CardItem className="flex flex-wrap gap-2.5">
                      {types.map((type) => (
                        <TypeBadge key={type.identifier} type={type} />
                      ))}
                    </CardItem>
                  </CardGroup>
                </Fragment>
              ))}
            </CardContent>
          </Card>
        ))}
      </SectionContent>
    </Section>
  );
}
