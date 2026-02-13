'use client';

import { type TrainingView } from '../../model/rest-info';
import InfoCard from '../info-card';

interface TrainingProps {
  training: TrainingView;
}

export default function Training({ training }: TrainingProps) {
  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  return (
    <InfoCard.Container title="훈련">
      <InfoCard.Item subject="포획률">{captureRate}</InfoCard.Item>
      <InfoCard.Item subject="기초 친밀도">{baseFriendShip}</InfoCard.Item>
      <InfoCard.Item subject="주는 노력치">{effortValues}</InfoCard.Item>
      <InfoCard.Item subject="필요 경험치">{growthRate}</InfoCard.Item>
    </InfoCard.Container>
  );
}
