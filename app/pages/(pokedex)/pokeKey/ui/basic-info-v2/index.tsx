import { Mars, Venus } from 'lucide-react';
import {
  type SpeciesView,
  GROWTH_RATE_LABEL,
  formatGenderRatio,
} from '../../model';
import { cn } from '@/app/shared/lib/cn';

interface BasicInfoProps {
  species: SpeciesView;
}

export default function BasicInfoV2({ species }: BasicInfoProps) {
  const {
    eggGroup1,
    eggGroup2,
    hatchCounter,
    genderRate,
    captureRate,
    baseHappiness,
    growthRate,
  } = species;

  const eggGroup = `${eggGroup1}` + (eggGroup2 ? `, ${eggGroup2}` : '');
  const gender = formatGenderRatio(genderRate);
  return (
    <div className="">
      <div className="p-6 bg-card border rounded-4xl">
        <div className="flex flex-col">
          <InfoItem label="알그룹">{eggGroup}</InfoItem>
          <InfoItem label="부화 카운트">{hatchCounter}</InfoItem>
          <InfoItem label="성비">
            {gender ? (
              <div className="flex flex-wrap items-center gap-1">
                {gender.male && (
                  <div className="flex items-center gap-0.5">
                    <Mars className="size-4.5 text-blue-600" />

                    <span className="text-blue-600 font-medium">
                      {gender.male}%
                    </span>
                  </div>
                )}

                {gender.female && (
                  <div className="flex items-center gap-0.5">
                    <Venus className="size-4.5 text-pink-600" />
                    <span className="text-pink-600 font-medium">
                      {gender.female}%
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">무성</div>
            )}
          </InfoItem>
          <InfoItem label="포획률">{captureRate}</InfoItem>
          <InfoItem label="기초 친밀도">{baseHappiness}</InfoItem>
          <InfoItem label="필요 경험치">
            {GROWTH_RATE_LABEL[growthRate]}
          </InfoItem>
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

function InfoItem({ label, className, children }: InfoItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between py-4 gap-0.5 border-b last:border-b-0 last:pb-0 first:pt-0',
        className,
      )}
    >
      <div className="text-muted-foreground text-md font-medium">{label}</div>
      <div className="text-pretty break-keep">{children}</div>
    </div>
  );
}
