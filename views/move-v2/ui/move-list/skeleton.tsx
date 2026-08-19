import { BASE_COUNT } from './config';

export default function MoveListSkeleton({
  count = BASE_COUNT,
}: {
  count?: number;
}) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="animate-pulse mt-11">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {items.map((i) => (
          <div key={i} className="rounded-4xl bg-muted/50 h-61.5" />
        ))}
      </div>
    </div>
  );
}
