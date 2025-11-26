'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function VersionSelector() {
  const pathname = usePathname();
  const isBasic = pathname?.includes('/basic');
  const isModern = pathname?.includes('/modern');

  return (
    <div className="flex items-center gap-2 p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
      <Link
        href="/basic"
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
          isBasic
            ? 'bg-white text-blue-600 shadow-md'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        Básico
      </Link>
      <Link
        href="/modern"
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
          isModern
            ? 'bg-white text-purple-600 shadow-md'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        Moderno
      </Link>
    </div>
  );
}

