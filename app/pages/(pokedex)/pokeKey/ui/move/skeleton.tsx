export default function MoveSkeleton() {
  return (
    <div className="p-6 shadow-sm shadow-border rounded-2xl border border-border bg-card">
      <h3 className="text-2xl font-semibold mb-4">기술</h3>
      <div className="h-8 bg-muted/40 rounded-full w-64 mb-4 animate-pulse" />
      <div className="h-8 bg-muted/40 rounded-full w-96 mb-4 animate-pulse" />
      <div className="h-64 bg-muted/40 rounded-xl animate-pulse" />
    </div>
  );
}
