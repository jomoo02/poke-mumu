function Card({ children }: { children: React.ReactNode }) {
  return (
    // <div className="p-4 border rounded-2xl bg-card flex flex-col">
    <div className="flex flex-col">{children}</div>
  );
}

function CardTitle({ title }: { title: string }) {
  return <h3 className="text-lg font-semibold">{title}</h3>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="py-3 flex flex-col">{children}</div>;
}

function CardItem({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="py-2.5 flex gap-3 items-stretch justify-between ">
      <div className="w-24 shrink-0 flex items-start text-muted-foreground font-medium">
        {label}
      </div>
      <div className="break-keep text-end text-pretty flex items-start font-medium">
        {children}
      </div>
    </div>
  );
}

export { Card, CardTitle, CardContent, CardItem };
