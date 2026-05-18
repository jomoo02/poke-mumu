import { Mars, Venus } from 'lucide-react';
import {
  type SpeciesView,
  GROWTH_RATE_LABEL,
  formatGenderRatio,
} from '../../model';

interface BasicInfoProps {
  species: SpeciesView;
}

export default function BasicInfo({ species }: BasicInfoProps) {
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
      <h2 className="text-3xl font-extrabold">기본 정보</h2>
      <div className="pt-6 ">
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 border bg-card rounded-4xl p-6">
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
  children: React.ReactNode;
}

function InfoItem({ label, children }: InfoItemProps) {
  return (
    <div className="flex flex-col py-1.5 gap-0.5">
      <div className="text-muted-foreground text-md font-medium">{label}</div>
      <div className="text-pretty break-keep">{children}</div>
    </div>
  );
}
