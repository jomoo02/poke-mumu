import MoveView from '@/views/(move)/move';
import { Suspense } from 'react';

export default function MovePage() {
  return (
    <Suspense>
      <MoveView />
    </Suspense>
  );
}
