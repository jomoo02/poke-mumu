import MoveIdentifierPageUI from '@/app/pages/move-identifier';
import { Suspense } from 'react';
import MoveIdentifierView from '@/views/move-identifier';

export default async function MoveIdentifierPage({
  params,
}: PageProps<'/move/[identifier]'>) {
  return (
    <Suspense>
      {params.then(({ identifier }) => (
        <MoveIdentifierView identifier={identifier} />
      ))}
    </Suspense>
  );
}
