'use client';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
// 정리 전까지 전국도감 종족값의 빈 상태를 그대로 쓴다
import PokeEmpty from '@/_pages/pokedex/national-base-stats-v0/ui/results/poke-empty';

import { getNameLanguageLabel, type NameLanguage } from '../model/name-language';

interface ResultsEmptyProps {
  // 고른 언어로는 없지만 다른 언어 이름으로 찾히는 수 (찾히는 언어만)
  otherLanguageMatches: { language: NameLanguage; count: number }[];
  onLanguageChange: (language: NameLanguage) => void;
}

/**
 * 결과 0개. 검색어가 다른 언어 이름이면(예: 한국어로 두고 'pikachu') 그 언어로 바로 넘어가게 안내한다.
 * 몰래 다른 언어까지 찾지 않고 알린다 (언어 = 이 목록의 이름·검색 언어라는 규칙을 지킨다).
 * 그 밖에는 기존 빈 상태 (필터 초기화 등)
 */
export default function ResultsEmpty({
  otherLanguageMatches,
  onLanguageChange,
}: ResultsEmptyProps) {
  if (otherLanguageMatches.length === 0) {
    return <PokeEmpty />;
  }

  return (
    <div className="flex flex-col items-start gap-1 py-6">
      <p className="font-medium">조건에 맞는 포켓몬이 없어요</p>
      {otherLanguageMatches.map(({ language, count }) => (
        <div key={language} className="mt-2 flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            {getNameLanguageLabel(language)} 이름으로는 {count}마리가 있어요
          </p>
          <Button
            variant="secondary"
            onClick={() => onLanguageChange(language)}
            className={cn(
              'h-10.5 px-4',
              'bg-input/50 dark:bg-input/70',
              '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
            )}
          >
            {getNameLanguageLabel(language)}로 보기
          </Button>
        </div>
      ))}
    </div>
  );
}
