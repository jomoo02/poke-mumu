function Card({ children }: { children: React.ReactNode }) {
  return (
    // <div className="p-4 border rounded-2xl bg-card flex flex-col">
    <div className="flex flex-col gap-2.5">{children}</div>
  );
}

function CardTitle({ title }: { title: string }) {
  return <h3 className="text-lg font-medium">{}</h3>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function CardItem({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className=" flex flex-col gap-1.5 items-stretch bg-muted/50 rounded-4xl p-6">
      <div className="w-24 shrink-0 flex items-start text-muted-foreground font-medium text-md">
        {label}
      </div>
      <div className="break-keep text-pretty flex items-start font-medium">
        {children}
      </div>
    </div>
  );
}

export { Card, CardTitle, CardContent, CardItem };
