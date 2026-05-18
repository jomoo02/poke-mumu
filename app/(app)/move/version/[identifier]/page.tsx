import MoveVersionIdentifierPageUI from '@/app/pages/move-version-identifier';
import { Suspense } from 'react';

export default function MoveVersionIdentifierPage({
  params,
}: PageProps<'/move/version/[identifier]'>) {
  return (
    <Suspense>
      {params.then(({ identifier }) => (
        <MoveVersionIdentifierPageUI identifier={identifier} />
      ))}
    </Suspense>
  );
}
