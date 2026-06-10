'use client';

import { Button } from '@/shared/ui/button';

export default function Jump() {
  const jumpTo = (target: number) => {
    document
      .getElementById(`dex-${target}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div>
      <Button variant={'outline'} onClick={() => jumpTo(100)}>
        Jump 100
      </Button>
    </div>
  );
}
