'use client';

import { useRef, type ReactNode } from 'react';
import { ViewModeProvider } from './view-mode.context';
import { StickyContextBar } from './sticky-context-bar';

interface GameDexWrapperProps {
  title: string;
  children: ReactNode;
}

export function GameDexWrapper({ title, children }: GameDexWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ViewModeProvider>
      <div ref={containerRef}>
        <StickyContextBar title={title} containerRef={containerRef} />
        {children}
      </div>
    </ViewModeProvider>
  );
}
