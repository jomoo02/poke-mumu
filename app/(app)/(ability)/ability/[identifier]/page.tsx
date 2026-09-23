// import AbilityIdentifierPageUI from '@/app/pages/ability-identifier';
// import AbilityIdentifierView from '@/views/ability-identifier';
import AbilityIdentifierView from '@/views/(ability)/identifier';
import AbilityIdentifierViewSkeleton from '@/views/(ability)/identifier/ui/skeleton';
import { Suspense } from 'react';

export default async function AbilityIdentifierPage({
  params,
}: PageProps<'/ability/[identifier]'>) {
  return (
    <Suspense fallback={<AbilityIdentifierViewSkeleton />}>
      {params.then(({ identifier }) => (
        <AbilityIdentifierView identifier={identifier} />
      ))}
    </Suspense>
  );
}
