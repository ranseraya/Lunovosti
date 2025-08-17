import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600">Access denied</h1>
      <p className="mt-4">You do not have permission to access this page.</p>
      <Link href="/Home" className="mt-6 inline-block bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}