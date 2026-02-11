import InfoCard from './info-card';
interface OtherNamesProps {
  names: {
    nameEn: string;
    nameJa: string;
  };
}
export default function OtherNames({ names }: OtherNamesProps) {
  return (
    <div className="p-6  rounded-2xl bg-muted/50">
      <div className="text-xl font-bold pb-4">다른 언어별 이름</div>
      <InfoCard.Container title="1">
        <InfoCard.Item subject="영문명">{names.nameEn}</InfoCard.Item>
        <InfoCard.Item subject="일본명">{names.nameJa}</InfoCard.Item>
      </InfoCard.Container>
    </div>
  );
}
