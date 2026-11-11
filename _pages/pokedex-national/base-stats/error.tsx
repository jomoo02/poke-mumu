'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Button } from '@/_shared/ui/button';
import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';

import { PAGE_TITLE } from './config';

interface NationalBaseStatsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

// 라우트 error.tsx가 연결하는 클라이언트 public API.
// 페이지(index.tsx)는 서버 전용 조회를 import하므로 클라이언트 경계를 따로 둔다.
// 에러 경계가 페이지 전체를 대신하므로 제목은 페이지와 같게 다시 그린다
export default function NationalBaseStatsError({
  error,
  retry,
}: NationalBaseStatsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{PAGE_TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <PageLayoutSection className="mt-0">
        <div role="alert" className="flex flex-col items-center gap-3 py-12">
          <div className="flex flex-col items-center gap-0.5">
            <p className="font-medium text-lg">
              포켓몬 목록을 불러오지 못했어요
            </p>
          </div>
          <div className="flex gap-3 mt-1.5">
            <Button
              variant="secondary"
              onClick={retry}
              className="w-32 h-11 cursor-pointer"
            >
              다시 시도하기
            </Button>
            <Button
              variant="default"
              nativeButton={false}
              render={<Link href="/" />}
              className="w-32 h-11"
            >
              메인으로
            </Button>
          </div>
        </div>
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}
