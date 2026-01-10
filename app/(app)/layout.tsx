import MainHeader from '../widgets/main-header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative z-10 flex flex-col min-h-svh bg-background font-suit">
      <MainHeader />
      <main className="flex flex-col flex-1 py-8">{children}</main>
    </div>
  );
}
