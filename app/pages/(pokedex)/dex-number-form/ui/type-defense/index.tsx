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

interface TypeDefensesProps {
  types: Type[];
  typeDefenses: TypeDefenseView[];
}

export default function TypeDefenses({
  typeDefenses,
  types,
}: TypeDefensesProps) {
  const description = types.map(({ name }) => name).join(', ');

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>방어 상성</CardTitle>
        <CardDescription>{description} 타입의 방어 상성</CardDescription>
      </CardHeader>
      <CardContent>
        {typeDefenses.map(({ multiple, description, types, color }, index) => (
          <Fragment key={multiple}>
            {index > 0 && <div className="w-full h-px bg-border" />}
            <CardGroup>
              <CardGroupLabel className="flex gap-1.5 items-center">
                {`${description}`}
                <Badge variant={color}>{multiple}</Badge>
              </CardGroupLabel>
              <CardItem className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <TypeBadge key={type.identifier} type={type} />
                ))}
              </CardItem>
            </CardGroup>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
