import Link from 'next/link';

import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="px-4 max-w-7xl mx-auto w-full mt-6  ">
        <div className="flex items-center h-16 justify-between bg-card/50 shadow-sm shadow-card rounded-2xl border border-border px-6 backdrop-blur-md">
          <Link
            href="/"
            className="flex items-center text-xl font-extrabold text-foreground"
          >
            포케무무
          </Link>
          <nav>
            <NavLink href="/pokedex">도감</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
