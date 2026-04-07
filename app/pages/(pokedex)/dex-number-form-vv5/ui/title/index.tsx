import { formatNumber } from '@/app/shared/lib/format';

interface TitleProps {
  poke: {
    dexNumber: number;
    name: string;
    form: string | null;
  };
}

export default function Title({ poke }: TitleProps) {
  const { dexNumber, name, form } = poke;
  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="flex-col gap-1 hidden lg:flex">
      <div className="text-lg font-bold text-muted-foreground">
        {formattedDexNumber}
      </div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <div className="text-lg font-semibold text-muted-foreground">{form}</div>
    </div>
  );
}
