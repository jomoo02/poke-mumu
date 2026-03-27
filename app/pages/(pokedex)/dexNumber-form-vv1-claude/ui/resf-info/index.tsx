'use client';

import { Card, CardHeader } from '../card';
import { type BreedingView, type TrainingView } from '../../../dex-number-form-vv1/model';
import RestInfoItem from './item';
import Breeding from './breeding';

interface RestInfoProps {
  names: { label: string; name: string }[];
  breeding: BreedingView;
  training: TrainingView;
}

export default function RestInfo({ names, breeding, training }: RestInfoProps) {
  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>언어별 이름</CardHeader>
          {names.map(({ label, name }) => (
            <RestInfoItem key={label} label={label}>
              {name}
            </RestInfoItem>
          ))}
        </Card>

        <Breeding breeding={breeding} />
      </div>

      <div>
        <Card>
          <CardHeader>훈련</CardHeader>
          <RestInfoItem label="포획률">{captureRate}</RestInfoItem>
          <RestInfoItem label="기초 친밀도">{baseFriendShip}</RestInfoItem>
          <RestInfoItem label="주는 노력치">{effortValues}</RestInfoItem>
          <RestInfoItem label="필요 경험치">{growthRate}</RestInfoItem>
        </Card>
      </div>
    </div>
  );
}
