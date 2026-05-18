import MoveIdentifierPageUI from '@/app/pages/move-identifier';
import { Suspense } from 'react';

export default async function MoveIdentifierPage({
  params,
}: PageProps<'/move/[identifier]'>) {
  return (
    <Suspense>
      {params.then(({ identifier }) => (
        <MoveIdentifierPageUI identifier={identifier} />
      ))}
    </Suspense>
  );
}
