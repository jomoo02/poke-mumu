import { type TrainingView } from '../../model/rest-info';
import InfoCard from '../info-card';

interface TrainingProps {
  training: TrainingView;
}

export default function Training({ training }: TrainingProps) {
  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  return (
    <div className="">
      <div className="text-xl font-semibold mb-4 w-full">훈련</div>
      {/* <div className="w-full h-1 bg-border rounded-lg mb-6 " /> */}
      <div className="bg-card p-6 rounded-2xl">
        {' '}
        <InfoCard.Container title="훈련">
          <InfoCard.Item subject="포획률">{captureRate}</InfoCard.Item>

          <InfoCard.Item subject="기초 친밀도">{baseFriendShip}</InfoCard.Item>

          <InfoCard.Item subject="주는 노력치">{effortValues}</InfoCard.Item>

          <InfoCard.Item subject="필요 경험치">{growthRate}</InfoCard.Item>
        </InfoCard.Container>
      </div>
    </div>
  );
}
