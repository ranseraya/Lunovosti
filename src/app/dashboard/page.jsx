'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const getDashboardPathForRole = (role) => {
  const userRole = role?.toUpperCase();
  if (userRole === 'ADMIN') return '/dashboard/admin';
  if (userRole === 'EDITOR') return '/dashboard/editor';
  if (userRole === 'AUTHOR') return '/dashboard/author';
  return '/Home';
};

export default function DashboardRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role) {
      const destination = getDashboardPathForRole(session.user.role);
      router.replace(destination);
    }

    if (status === 'unauthenticated') {
        router.replace('/login');
    }

  }, [session, status, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Redirecting...</p>
    </div>
  );
}