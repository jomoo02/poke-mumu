'use client';

import { useRef } from 'react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface AllFilterFooterProps {
  // 지울 게 없으면 막는다
  canReset: boolean;
  onReset: () => void;
  // 닫기 버튼 문구 ('120개 보기'). 고르는 즉시 반영되므로 이 버튼은 닫기만 한다
  resultLabel: string;
  onDone: () => void;
  className?: string;
}

const FOOTER_BUTTON_CLASS_NAME = cn('h-12 cursor-pointer rounded-lg text-base');

// 통합 필터 아래 [초기화][N개 보기]. 초기화하면 그 버튼이 막히므로 포커스를 '보기'로 옮긴다
export default function AllFilterFooter({
  canReset,
  onReset,
  resultLabel,
  onDone,
  className,
}: AllFilterFooterProps) {
  const doneRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={cn('flex shrink-0 gap-2', className)}>
      <Button
        variant="secondary"
        disabled={!canReset}
        onClick={() => {
          onReset();
          doneRef.current?.focus();
        }}
        className={cn(FOOTER_BUTTON_CLASS_NAME, 'px-6')}
      >
        초기화
      </Button>
      <Button
        ref={doneRef}
        onClick={onDone}
        className={cn(FOOTER_BUTTON_CLASS_NAME, 'flex-1')}
      >
        {resultLabel}
      </Button>
    </div>
  );
}
