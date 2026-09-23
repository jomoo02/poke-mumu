'use client';

import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

interface AbilityPreviewProps {
  ability: Ability;
  displayNumber: number;
  className?: string;
}

/** 선택된 특성의 요약 패널. lg 이상에서는 우측 sticky, 미만에서는 목록 아래 인라인. */
export default function AbilityPreview({
  ability,
  displayNumber,
  className,
}: AbilityPreviewProps) {
  return (
    <Card className={cn('rounded-3xl gap-4', className)}>
      <CardHeader>
        <CardTitle>{ability.nameKo}</CardTitle>
        <CardDescription>
          {ability.nameJa
            ? `${ability.nameEn} / ${ability.nameJa}`
            : ability.nameEn}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <span className="rounded-full border px-2 py-0.5">
            {ability.gen}세대
          </span>
          <span className="rounded-full border px-2 py-0.5 tabular-nums">
            No.{String(displayNumber).padStart(3, '0')}
          </span>
          {ability.isChampions && (
            <span className="rounded-full border px-2 py-0.5">챔피언스</span>
          )}
        </div>
        <Separator />
        <p className="text-sm leading-relaxed text-foreground/70 break-keep">
          {ability.flavorText}
        </p>
        <Button asChild size="lg" className="w-full">
          <Link href={`/ability/${ability.identifier}`}>
            특성 상세 보기
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
