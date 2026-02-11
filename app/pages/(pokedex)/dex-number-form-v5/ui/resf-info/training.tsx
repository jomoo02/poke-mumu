import { type TrainingView } from '../../model/rest-info';
import InfoCard from '../info-card';

interface TrainingProps {
  training: TrainingView;
}

export default function Training({ training }: TrainingProps) {
  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  return (
    <div className=" p-6 rounded-2xl bg-muted/50">
      <div className="text-xl font-semibold pb-4">훈련</div>
      <InfoCard.Container title="훈련">
        <InfoCard.Item subject="포획률">{captureRate}</InfoCard.Item>

        <InfoCard.Item subject="기초 친밀도">{baseFriendShip}</InfoCard.Item>

        <InfoCard.Item subject="주는 노력치">{effortValues}</InfoCard.Item>

        <InfoCard.Item subject="필요 경험치">{growthRate}</InfoCard.Item>
      </InfoCard.Container>
    </div>
  );
}
