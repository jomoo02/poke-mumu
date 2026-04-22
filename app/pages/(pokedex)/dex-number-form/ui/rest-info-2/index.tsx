import { MarsIcon, VenusIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardGroupLabel,
  CardHeader,
  CardTitle,
} from '@/app/shared/ui/card';

import {
  type BreedingView,
  type TrainingView,
  type NameView,
  DexInfoView,
} from '../../model';

interface RestInfo2Props {
  names: NameView[];
  breeding: BreedingView;
  dexInfo: DexInfoView;
  training: TrainingView;
}

export default function RestInfo2({
  names,
  breeding,
  training,
  dexInfo,
}: RestInfo2Props) {
  const { eggGroups, genderRatio, hatchCounter } = breeding;
  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  const hatchSteps =
    hatchCounter !== '-'
      ? `${hatchCounter} (약 ${Number(hatchCounter) * 264}걸음)`
      : '-';

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <InfoCard title="도감">
        <InfoRow label="분류" value={dexInfo.genera} />
        <InfoRow label="몸무게" value={dexInfo.weight} />
        <InfoRow label="키" value={dexInfo.height} />
      </InfoCard>

      <InfoCard title="유전">
        <InfoRow label="알그룹" value={eggGroups.join(', ')} />
        <InfoRow label="부화카운트" value={hatchSteps} />
        <InfoRow
          label="성비"
          value={
            genderRatio ? (
              <div className="flex gap-3 flex-wrap justify-end">
                {genderRatio.male != null && (
                  <span className="flex items-center gap-1 text-blue-500">
                    <MarsIcon className="size-4" />
                    {genderRatio.male}%
                  </span>
                )}
                {genderRatio.female != null && (
                  <span className="flex items-center gap-1 text-pink-500">
                    <VenusIcon className="size-4" />
                    {genderRatio.female}%
                  </span>
                )}
              </div>
            ) : (
              '무성'
            )
          }
        />
      </InfoCard>

      <InfoCard title="훈련">
        <InfoRow label="포획률" value={captureRate} />
        <InfoRow label="기초 친밀도" value={baseFriendShip} />
        <InfoRow label="주는 노력치" value={effortValues} />
        <InfoRow label="필요 경험치" value={growthRate} />
      </InfoCard>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle> {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y">{children}</div>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <span className="text-muted-foreground w-24 shrink-0">{label}</span>
      <span className="text-base font-medium text-end text-pretty flex-1">
        {value}
      </span>
    </div>
  );
}
