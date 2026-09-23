import type { ComponentType, ReactNode } from 'react';

import type { Move } from '@/entities/move/model';

import {
  type MoveLabelMode,
  MoveRowC,
  MoveRowC1,
  MoveRowC2,
  MoveRowC3,
  MoveRowC4,
  MoveRowC5,
  MoveRowC6,
} from './variants';

interface MoveListProps {
  moves: Move[];
}

interface Layout {
  title: string;
  description: string;
  Row: ComponentType<{ move: Move; label: MoveLabelMode }>;
}

const LABELS: { mode: MoveLabelMode; name: string }[] = [
  { mode: 'icon', name: '아이콘' },
  { mode: 'text', name: '텍스트' },
  { mode: 'badge', name: '뱃지' },
];

const LAYOUTS: Layout[] = [
  {
    title: 'C. 설명 위 메타 줄',
    description: '타입 · 분류와 스탯을 한 줄로 묶어 설명 위에 둡니다.',
    Row: MoveRowC,
  },
  {
    title: 'C-1. 이름 아래 메타 줄',
    description: '메타 줄을 이름 아래 좌측 열로 옮기고, 설명은 우측 공간을 넓게 씁니다.',
    Row: MoveRowC1,
  },
  {
    title: 'C-2. 설명 아래 메타 줄',
    description: '설명을 먼저 읽고, 메타 줄은 보조 정보로 뒤에 둡니다.',
    Row: MoveRowC2,
  },
  {
    title: 'C-3. 이름 옆 메타 줄 · 설명 전체 폭',
    description: '2열 없이 이름과 메타 줄을 한 줄 양 끝에 두고, 설명은 아래에 전체 폭으로 둡니다.',
    Row: MoveRowC3,
  },
  {
    title: 'C-4. 이름 아래 두 줄 메타',
    description: '타입 · 분류와 스탯을 줄을 나눠 이름 아래에 쌓습니다. 좌측 열 폭이 좁아도 줄바꿈되지 않습니다.',
    Row: MoveRowC4,
  },
  {
    title: 'C-5. 배경 띠 메타 줄',
    description: '메타 줄을 옅은 배경으로 감싸 설명과 구분하고, 스탯은 가운뎃점으로 촘촘하게 둡니다.',
    Row: MoveRowC5,
  },
  {
    title: 'C-6. 양 끝 정렬 메타 줄',
    description: '타입 · 분류는 왼쪽, 스탯은 오른쪽 끝에 두어 행마다 스탯 위치가 일정합니다.',
    Row: MoveRowC6,
  },
];

/** C 형태(메타 줄) 변형의 배치 · 표시 방식을 비교하기 위한 시안 모음 */
export default function MoveListV3({ moves }: MoveListProps) {
  const sampleMoves = moves.slice(0, 2);

  return (
    <div className="flex flex-col gap-20">
      {LAYOUTS.map(({ title, description, Row }) => (
        <LayoutSection key={title} title={title} description={description}>
          {LABELS.map(({ mode, name }) => (
            <VariantSection key={mode} title={name}>
              {sampleMoves.map((move) => (
                <Row key={move.identifier} move={move} label={mode} />
              ))}
            </VariantSection>
          ))}
        </LayoutSection>
      ))}
    </div>
  );
}

interface LayoutSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

function LayoutSection({ title, description, children }: LayoutSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-10">{children}</div>
    </section>
  );
}

interface VariantSectionProps {
  title: string;
  children: ReactNode;
}

function VariantSection({ title, children }: VariantSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="w-fit rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground/70">
        {title}
      </h3>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}
