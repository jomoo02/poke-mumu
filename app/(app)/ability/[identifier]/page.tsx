// import AbilityIdentifierPageUI from '@/app/pages/ability-identifier';
import AbilityIdentifierView from '@/views/ability-identifier';
import { Suspense } from 'react';

export default async function AbilityIdentifierPage({
  params,
}: PageProps<'/ability/[identifier]'>) {
  return (
    <Suspense>
      {params.then(({ identifier }) => (
        <AbilityIdentifierView identifier={identifier} />
      ))}
    </Suspense>
  );
}
