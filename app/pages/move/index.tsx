import { Suspense } from 'react';
import { getAllMoves } from './api';

import Container from './ui/container';

export default async function MovePageUI() {
  const moves = await getAllMoves();

  return (
    <div className="px-4 sm:px-6 xl:px-0 mx-auto max-w-7xl py-16 min-h-svh flex flex-col gap-6 w-full">
      <h1 className="text-4xl font-bold tracking-tight">기술</h1>
      <Suspense>
        <Container moves={moves} />
      </Suspense>
    </div>
  );
}
