function Card({ children }: { children: React.ReactNode }) {
  return (
    // <div className="p-4 border rounded-2xl bg-card flex flex-col">
    <div className="flex flex-col gap-2.5">{children}</div>
  );
}

function CardTitle({ title }: { title: string }) {
  return <h3 className="text-lg font-medium">{title}</h3>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function CardItem({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="py-1.5 flex flex-col gap-1 items-stretch">
      <div className="w-24 shrink-0 flex items-start text-muted-foreground font-medium">
        {label}
      </div>
      <div className="break-keep text-pretty flex items-start font-medium">
        {children}
      </div>
    </div>
  );
}

export { Card, CardTitle, CardContent, CardItem };
