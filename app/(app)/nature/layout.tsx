import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 sm:px-6 py-4">
        <div className="flex gap-x-1.5 items-center">
          <Link href="/" className="text-primary">
            Home
          </Link>
          <div>
            <ChevronRightIcon className="size-4.5" />
          </div>
          <div>성격</div>
        </div>
      </div>
      {children}
    </div>
  );
}
