import { Suspense } from 'react';

import AbilityDetailPage, {
  AbilityDetailPageSkeleton,
} from '@/_pages/ability/detail';

export default async function AbilityIdentifierPage({
  params,
}: PageProps<'/ability/[identifier]'>) {
  return (
    <Suspense fallback={<AbilityDetailPageSkeleton />}>
      {params.then(({ identifier }) => (
        <AbilityDetailPage identifier={identifier} />
      ))}
    </Suspense>
  );
}
