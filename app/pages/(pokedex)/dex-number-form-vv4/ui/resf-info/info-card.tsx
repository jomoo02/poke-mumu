function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 border rounded-2xl bg-card flex flex-col">
      {children}
    </div>
  );
}

function CardTitle({ title }: { title: string }) {
  return <h3 className="text-xl font-semibold">{title}</h3>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="pt-3">{children}</div>;
}

function CardItem({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="py-3 flex items-stretch justify-between">
      <div className="w-24 shrink-0 font-medium text-muted-foreground flex items-start">
        {label}
      </div>
      <div className="break-keep text-end text-pretty flex items-start font-medium">
        {children}
      </div>
    </div>
  );
}

export { Card, CardTitle, CardContent, CardItem };
