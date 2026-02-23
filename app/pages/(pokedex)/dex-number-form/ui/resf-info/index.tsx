'use client';

import { MarsIcon, VenusIcon } from 'lucide-react';

import { Card, CardHeader, CardItem } from '../card';
import { type BreedingView, type TrainingView } from '../../model';
import RestInfoItem from './item';
import Breeding from './breeding';

interface RestInfoProps {
  names: {
    label: string;
    name: string;
  }[];
  breeding: BreedingView;
  training: TrainingView;
}

export default function RestInfo({ names, breeding, training }: RestInfoProps) {
  const namesTitle = '언어별 이름';
  const trainingTitle = '훈련';

  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>{namesTitle}</CardHeader>
          <div>
            {names.map(({ label, name }) => (
              <RestInfoItem key={label} label={label}>
                {name}
              </RestInfoItem>
            ))}
          </div>
        </Card>
        <Breeding breeding={breeding} />
      </div>
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>{trainingTitle}</CardHeader>
          <RestInfoItem label="포획률">{captureRate}</RestInfoItem>
          <RestInfoItem label="기초 친밀도">{baseFriendShip}</RestInfoItem>
          <RestInfoItem label="주는 노력치">{effortValues}</RestInfoItem>
          <RestInfoItem label="필요 경험치">{growthRate}</RestInfoItem>
        </Card>
      </div>
    </div>
  );
}
