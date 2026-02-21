import { MarsIcon, VenusIcon } from 'lucide-react';

import { type BreedingView } from '../../model/rest-info';
import { Card, CardHeader } from '../card';
import RestInfoItem from './item';

interface BreedingProps {
  breeding: BreedingView;
}

export default function Breeding({ breeding }: BreedingProps) {
  const breedingTitle = '유전';
  const { eggGroups, genderRatio, hatchCounter } = breeding;

  return (
    <Card>
      <CardHeader>{breedingTitle}</CardHeader>
      <RestInfoItem label="알그룹">
        {eggGroups.map((group, index) => (
          <span key={group}>
            {index > 0 && <>{', '}</>}
            {group}
          </span>
        ))}
      </RestInfoItem>
      <RestInfoItem label="부화카운트">
        {hatchCounter}
        {hatchCounter !== '-' && (
          <span className="ml-1">(약 {Number(hatchCounter) * 264} 걸음)</span>
        )}
      </RestInfoItem>
      <RestInfoItem label="성비">
        {genderRatio ? (
          <div className="flex items-center gap-1 text-base">
            {genderRatio.male && (
              <div className="flex items-center gap-0.5">
                <MarsIcon className="size-4 text-blue-600" />
                <span className=" text-blue-600">{genderRatio.male}%</span>
              </div>
            )}
            {genderRatio.female && (
              <div className="flex items-center gap-0.5">
                <VenusIcon className="size-4 text-pink-600" />
                <span className="text-pink-600">{genderRatio.female}%</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center">무성</div>
        )}
      </RestInfoItem>
    </Card>
  );
}
