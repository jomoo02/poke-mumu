import { Mars, Venus } from 'lucide-react';
import { BreedingView } from '../../model/rest-info';
import InfoCard from '../info-card';

interface BreedingProps {
  breeding: BreedingView;
}

export default function Breeding({ breeding }: BreedingProps) {
  const { eggGroups, genderRatio, hatchCounter } = breeding;

  return (
    <InfoCard.Container title="유전">
      <InfoCard.Item subject="알그룹">
        {eggGroups.map((group, index) => (
          <span key={group}>
            {index > 0 && <>{', '}</>}
            {group}
          </span>
        ))}
      </InfoCard.Item>
      <InfoCard.Item subject="부화카운트">
        {hatchCounter}
        {hatchCounter !== '-' && (
          <span className="ml-1">(약 {Number(hatchCounter) * 264} 걸음)</span>
        )}
      </InfoCard.Item>
      <InfoCard.Item className="" subject="성비">
        {genderRatio ? (
          <div className="flex justify-between items-center gap-1 text-base">
            {genderRatio.male && (
              <div className="flex items-center gap-0.5">
                <Mars className="size-4 text-blue-600" />
                <span>{genderRatio.male}%</span>
              </div>
            )}

            {genderRatio.female && (
              <div className="flex items-center gap-0.5">
                <Venus className="size-4 text-pink-600" />
                <span>{genderRatio.female}%</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center">무성</div>
        )}
      </InfoCard.Item>
    </InfoCard.Container>
  );
}
