import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import DashboardClientPage from './client-page';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !['ADMIN', 'EDITOR', 'AUTHOR'].includes(session.user.role)) {
    redirect('/login');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/articles`, { cache: 'no-store' });
  const articles = await response.json();

  return <DashboardClientPage articles={articles} />;
}