import AbilityIdentifierPageUI from '@/app/pages/ability-identifier';
import { Suspense } from 'react';

export default async function AbilityIdentifierPage({
  params,
}: PageProps<'/ability/[identifier]'>) {
  return (
    <Suspense>
      {params.then(({ identifier }) => (
        <AbilityIdentifierPageUI identifier={identifier} />
      ))}
    </Suspense>
  );
}
