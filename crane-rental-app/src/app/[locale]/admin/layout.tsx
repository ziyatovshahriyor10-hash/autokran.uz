'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          setIsAuthenticated(true);
        } else if (!pathname.includes('/admin/login')) {
          const currentLocale = pathname.split('/')[1] || 'uz';
          router.push(`/${currentLocale}/admin/login`);
        }
      } catch (e) {
        if (!pathname.includes('/admin/login')) {
          const currentLocale = pathname.split('/')[1] || 'uz';
          router.push(`/${currentLocale}/admin/login`);
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;
  }

  if (pathname.includes('/admin/login')) {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  const currentLocale = pathname.split('/')[1] || 'uz';

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${currentLocale}/admin/login`);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 shadow-md">
        <div className="p-4 text-xl font-bold border-b border-gray-200 dark:border-zinc-800">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          <Link href={`/${currentLocale}/admin/dashboard`} className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
            Dashboard
          </Link>
          <Link href={`/${currentLocale}/admin/cranes`} className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
            Kranlar
          </Link>
          <Link href={`/${currentLocale}/admin/bookings`} className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
            Buyurtmalar
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800 absolute bottom-0 w-64">
          <button onClick={handleLogout} className="w-full text-left p-2 text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded">
            Chiqish
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
