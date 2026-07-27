import type { Move } from '@/entities/move/model';
import { TypeIcon } from '@/entities/type/ui';
import { Card, CardContent, CardGroup } from '@/shared/ui/card';
import { PageLayoutSection } from '@/shared/ui/page-layout';

interface AbilityInfoProps {
  move: Move;
}

export default function MoveInfo({ move }: AbilityInfoProps) {
  const appearedText = `${move.generation}세대`;
  const power = move.power ? `${move.power}` : '-';
  const accuracy = move.accuracy ? `${move.accuracy}` : '-';
  const pp = move.pp ? `${move.pp}` : '-';

  return (
    <PageLayoutSection className=" mt-3">
      <Card className="max-w-sm">
        <CardContent>
          <CardGroup>
            <Info title="위력">{power}</Info>
            <Info title="명중률">{accuracy}</Info>
            <Info title="PP">{pp}</Info>
            <Info title="타입">
              <div className="flex items-center gap-1.5">
                <TypeIcon
                  type={{
                    identifier: move.typeIdentifier,
                    nameKo: move.typeNameKo,
                  }}
                />
                <span className="text-md">{move.typeNameKo}</span>
              </div>
            </Info>
            <Info title="첫 등장">{appearedText}</Info>
          </CardGroup>
        </CardContent>
      </Card>
    </PageLayoutSection>
  );
}

interface InfoProps {
  title: string;
  children: React.ReactNode;
}

function Info({ title, children }: InfoProps) {
  return (
    <div className="grid grid-cols-2 items-center p-4 bg-muted/50 rounded-2xl">
      <div className="text-foreground/70 text-center">{title}</div>
      <div className="text-center">{children}</div>
    </div>
  );
}
