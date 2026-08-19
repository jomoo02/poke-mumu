import {
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { LegendsArceusMove } from '../../api';
import { cn } from '@/shared/lib/cn';

export default function LaMove({ move }: { move: LegendsArceusMove | null }) {
  if (!move) {
    return null;
  }
  const description = `${move.nameKo}의 LEGENDS 아르세우스 버전 기술 정보`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>LEGENDS 아르세우스</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardGroup className="grid  gap-2.5">
          <Item subject="타입">{move.type?.nameKo}</Item>
          <Item subject="분류">{move.damageClass?.nameKo}</Item>
          <Item subject="PP">{move.pp}</Item>
          <Item subject="위력">
            <Item2
              standard={move.powerStandard}
              agile={move.powerAgile}
              strong={move.powerStrong}
            />
          </Item>
          <Item subject="명중">
            <Item2
              standard={move.accuracyStandard}
              agile={move.accuracyAgile}
              strong={move.accuracyStrong}
            />
          </Item>
        </CardGroup>

        <CardGroup>
          <div className="font-medium">행동 순서</div>
          <Item subject="자신">
            <Item2
              standard={move.actionSpeedSelfStandard}
              agile={move.actionSpeedSelfAgile}
              strong={move.actionSpeedSelfStrong}
            />
          </Item>
          <Item subject="상대">
            <Item2
              standard={move.actionSpeedTargetStandard}
              agile={move.actionSpeedTargetAgile}
              strong={move.actionSpeedTargetStrong}
            />
          </Item>
        </CardGroup>
        <CardGroup>
          <div className="font-medium">추가 효과</div>
          <Item subject="확률">
            <Item2
              standard={move.effectChanceStandard}
              agile={move.effectChanceAgile}
              strong={move.effectChanceStrong}
            />
          </Item>
          <Item subject="턴">
            <Item2
              standard={move.effectTurnsStandard}
              agile={move.effectTurnsAgile}
              strong={move.effectTurnsStrong}
            />
          </Item>
          {move.effectNote}
        </CardGroup>
      </CardContent>
    </Card>
  );
}

function Item({
  subject,
  children,
  className,
}: {
  subject: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border rounded-2xl flex gap-3.5 items-center overflow-hidden',
        className,
      )}
    >
      <div className="text-sm text-foreground/70 font-medium bg-muted/70 w-20 h-full py-3 rounded-l-2xl flex items-center justify-center">
        {subject}
      </div>
      <div className="text-md flex-1">{children}</div>
    </div>
  );
}

function Item2({
  standard,
  agile,
  strong,
}: {
  standard: number | null;
  agile: number | null;
  strong: number | null;
}) {
  return (
    <div className="grid grid-cols-3 py-1.75 gap-x-1">
      <div className="flex flex-col">
        <div className="text-foreground/70 text-xs">기본</div>
        {standard ?? '-'}
      </div>
      <div className="flex flex-col  ">
        <div className="text-foreground/70 text-xs">속공</div>
        {agile ?? '-'}
      </div>
      <div className="flex flex-col  ">
        <div className="text-foreground/70 text-xs">강공</div>
        {strong ?? '-'}
      </div>
    </div>
  );
}
