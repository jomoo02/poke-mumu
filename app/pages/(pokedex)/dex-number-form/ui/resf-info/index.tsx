'use client';

import { MarsIcon, VenusIcon } from 'lucide-react';

import { Card, CardTitle, CardContent, CardItem } from './info-card';
import {
  type BreedingView,
  type TrainingView,
  type NameView,
} from '../../model';

interface RestInfoProps {
  names: NameView[];
  breeding: BreedingView;
  training: TrainingView;
}

export default function RestInfo({ names, breeding, training }: RestInfoProps) {
  const namesTitle = '언어별 이름';
  const trainingTitle = '훈련';
  const breedingTitle = '유전';

  const { eggGroups, genderRatio, hatchCounter } = breeding;
  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  return (
    <div className="rounded-4xl flex flex-col gap-6">
      {/* <h2 className="text-xl font-bold tracking-wide">기타 정보</h2> */}
      <div className="grid grid-cols-5 gap-6  ">
        <CardContent>
          {names.map(({ label, name }) => (
            <CardItem key={label} label={label}>
              {name}
            </CardItem>
          ))}
        </CardContent>
        <CardContent>
          <CardItem label="알그룹">
            {eggGroups.map((group, index) => (
              <span key={group}>
                {index > 0 && <>{', '}</>}
                {group}
              </span>
            ))}
          </CardItem>
          <CardItem label="부화카운트">
            {hatchCounter}
            {hatchCounter !== '-' && (
              <>{` (약 ${Number(hatchCounter) * 264} 걸음)`}</>
            )}
          </CardItem>
          <CardItem label="성비">
            {genderRatio ? (
              <div className="flex gap-1 flex-wrap">
                {genderRatio.male && (
                  <div className="flex items-center gap-0.5">
                    <MarsIcon className="size-4.5 text-blue-500" />
                    <span className="text-blue-500 ">{genderRatio.male}%</span>
                  </div>
                )}
                {genderRatio.female && (
                  <div className="flex items-center gap-0.5">
                    <VenusIcon className="size-4.5 text-pink-500" />
                    <span className="text-pink-500">{genderRatio.female}%</span>
                  </div>
                )}
              </div>
            ) : (
              <>무성</>
            )}
          </CardItem>
        </CardContent>

        <CardContent>
          <CardItem label="포획률">{captureRate}</CardItem>
          <CardItem label="기초 친밀도">{baseFriendShip}</CardItem>
          <CardItem label="주는 노력치">{effortValues}</CardItem>
          <CardItem label="필요 경험치">{growthRate}</CardItem>
        </CardContent>
        <Card>
          <CardTitle title={namesTitle} />
        </Card>
      </div>
    </div>
  );
}
