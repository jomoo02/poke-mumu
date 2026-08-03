import {
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { LegendsArceusMove } from '../../api';

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
        <CardGroup className="flex flex-col gap-2.5">
          <Item subject="타입">{move.type?.nameKo}</Item>
          <Item subject="분류">{move.damageClass?.nameKo}</Item>
          <Item subject="PP">{move.pp}</Item>
        </CardGroup>
        <CardGroup className="flex flex-col gap-2">
          <div className="flex gap-4 items-center overflow-hidden">
            <div className="w-24" />
            <div className="grid grid-cols-3 flex-1 text-sm">
              <div />
              <div className="text-muted-foreground">속공</div>
              <div className="text-muted-foreground">강공</div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Item subject="위력">
              <div className="grid grid-cols-3 w-full items-center">
                <div>{move.powerStandard ?? '-'}</div>
                <div>{move.powerAgile ?? '-'}</div>
                <div>{move.powerStrong ?? '-'}</div>
              </div>
            </Item>
            <Item subject="명중">
              <div className="grid grid-cols-3 w-full items-center">
                <div>{move.accuracyStandard ?? '-'}</div>
                <div>{move.accuracyAgile ?? '-'}</div>
                <div>{move.accuracyStrong ?? '-'}</div>
              </div>
            </Item>
          </div>
        </CardGroup>

        <CardGroup>
          <div>추가 효과</div>
          <div>aditional effect</div>
        </CardGroup>
      </CardContent>
    </Card>
  );
}

function Item({
  subject,
  children,
}: {
  subject: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-2xl flex gap-4 items-center overflow-hidden ">
      <div className="text-md text-foreground/70 bg-muted/70 w-24 py-3 rounded-l-2xl flex items-center justify-center">
        {subject}
      </div>
      <div className="text-md flex-1">{children}</div>
    </div>
  );
}
