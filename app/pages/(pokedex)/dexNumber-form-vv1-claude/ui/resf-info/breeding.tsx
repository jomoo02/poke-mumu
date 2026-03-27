import { MarsIcon, VenusIcon } from 'lucide-react';
import { type BreedingView } from '../../../dex-number-form-vv1/model/rest-info';
import { Card, CardHeader } from '../card';
import RestInfoItem from './item';

interface BreedingProps {
  breeding: BreedingView;
}

export default function Breeding({ breeding }: BreedingProps) {
  const { eggGroups, genderRatio, hatchCounter } = breeding;

  return (
    <Card>
      <CardHeader>유전</CardHeader>
      <RestInfoItem label="알그룹">
        {eggGroups.map((group, index) => (
          <span key={group}>
            {index > 0 && ', '}
            {group}
          </span>
        ))}
      </RestInfoItem>
      <RestInfoItem label="부화카운트">
        {hatchCounter}
        {hatchCounter !== '-' && (
          <span className="ml-1 text-muted-foreground">
            (약 {Number(hatchCounter) * 264} 걸음)
          </span>
        )}
      </RestInfoItem>
      <RestInfoItem label="성비">
        {genderRatio ? (
          <div className="flex items-center gap-2">
            {genderRatio.male && (
              <span className="flex items-center gap-0.5 text-blue-500">
                <MarsIcon className="size-3.5" />
                {genderRatio.male}%
              </span>
            )}
            {genderRatio.female && (
              <span className="flex items-center gap-0.5 text-pink-500">
                <VenusIcon className="size-3.5" />
                {genderRatio.female}%
              </span>
            )}
          </div>
        ) : (
          <span>무성</span>
        )}
      </RestInfoItem>
    </Card>
  );
}
