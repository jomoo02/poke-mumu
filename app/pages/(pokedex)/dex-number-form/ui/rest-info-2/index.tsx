import { MarsIcon, VenusIcon } from 'lucide-react';

import { type BreedingView, type TrainingView, type NameView } from '../../model';

interface RestInfo2Props {
  names: NameView[];
  breeding: BreedingView;
  training: TrainingView;
}

export default function RestInfo2({ names, breeding, training }: RestInfo2Props) {
  const { eggGroups, genderRatio, hatchCounter } = breeding;
  const { growthRate, baseFriendShip, captureRate, effortValues } = training;

  const hatchSteps =
    hatchCounter !== '-'
      ? `${hatchCounter} (약 ${Number(hatchCounter) * 264}걸음)`
      : '-';

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <InfoCard title="언어별 이름">
        {names.map(({ label, name }) => (
          <InfoRow key={label} label={label} value={name} />
        ))}
      </InfoCard>

      <InfoCard title="유전">
        <InfoRow label="알그룹" value={eggGroups.join(', ')} />
        <InfoRow label="부화카운트" value={hatchSteps} />
        <InfoRow
          label="성비"
          value={
            genderRatio ? (
              <div className="flex gap-3 flex-wrap">
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
    <div className="flex flex-col gap-6 rounded-3xl bg-muted/40 p-6">
      <h3 className="border-b border-border pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-md text-muted-foreground">{label}</span>
      <span className="text-base font-medium break-keep">{value}</span>
    </div>
  );
}
