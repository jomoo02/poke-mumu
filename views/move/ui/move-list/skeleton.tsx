export default function MoveListSkeleton({ count }: { count: number }) {
  return (
    <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="h-55.5 rounded-xl bg-muted/40" />
      ))}
    </ul>
  );
}
