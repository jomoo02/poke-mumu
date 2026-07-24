export default function MoveListSkeleton({ count }: { count: number }) {
  return (
    <div className="mt-11 animate-pulse">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="h-50 rounded-4xl bg-muted/50" />
        ))}
      </div>
    </div>
  );
}
