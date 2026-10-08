'use client';

import { useEffect } from 'react';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';

interface MoveListErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

// 라우트 error.tsx가 연결하는 클라이언트 public API.
// 페이지(index.tsx)는 서버 전용 조회를 import하므로 클라이언트 경계를 따로 둔다.
// 에러 경계가 페이지 전체를 대신하므로 제목은 페이지와 같게 다시 그린다
export default function MoveListError({ error, retry }: MoveListErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>기술</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription>
          모든 기술 목록
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <PageLayoutSection className="mt-3">
        <div role="alert" className="flex flex-col items-start gap-1 py-6">
          <p className="font-medium">기술 목록을 불러오지 못했어요</p>
          <p className="text-sm text-muted-foreground">
            잠시 후 다시 시도해 주세요
          </p>
          <Button
            variant="secondary"
            onClick={retry}
            className={cn(
              'mt-3 h-10.5 px-4',
              'bg-input/50 dark:bg-input/70',
              '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
            )}
          >
            <RotateCwIcon aria-hidden />
            다시 시도
          </Button>
        </div>
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}
