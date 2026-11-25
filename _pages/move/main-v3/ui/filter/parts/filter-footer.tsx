'use client';

import { useRef } from 'react';

import { SheetFooter, SheetFooterButton } from '@/_shared/ui/sheet';

interface FilterFooterProps {
  // 지울 게 없으면 막는다
  canReset: boolean;
  onReset: () => void;
  // 닫기 버튼 문구 ('120개 보기'). 고르는 즉시 반영되므로 이 버튼은 닫기만 한다
  resultLabel: string;
  // 닫기 (드로어·시트 어느 쪽이든 쓰는 쪽이 open을 내린다)
  onDone: () => void;
}

// 드로어·시트 아래: [초기화][N개 보기]. 초기화하면 버튼이 막히므로 포커스를 '보기'로 옮긴다
export default function FilterFooter({
  canReset,
  onReset,
  resultLabel,
  onDone,
}: FilterFooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    // 모바일 드로어는 바닥에 붙으므로 아래 여백에 홈 표시줄 영역을 더한다 (데스크탑은 0)
    <SheetFooter
      ref={footerRef}
      className="flex flex-row pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <SheetFooterButton
        variant="input"
        disabled={!canReset}
        onClick={() => {
          onReset();
          footerRef.current
            ?.querySelector<HTMLButtonElement>('[data-filter-done]')
            ?.focus();
        }}
        className="cursor-pointer px-6"
      >
        초기화
      </SheetFooterButton>
      <SheetFooterButton
        data-filter-done
        onClick={onDone}
        className="flex-1 cursor-pointer"
      >
        {resultLabel}
      </SheetFooterButton>
    </SheetFooter>
  );
}
