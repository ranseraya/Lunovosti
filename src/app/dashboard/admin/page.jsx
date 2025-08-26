'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const handleDelete = async (slug) => {
    if (confirm(`Are you sure to delete this article "${slug}"?`)) {
      try {
        const response = await fetch(`/api/articles/${slug}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to detele this article');
        setArticles(articles.filter(article => article.slug !== slug));
        alert('Article successfully deleted!');
      } catch (error) {
        console.error(error);
        alert('Failed to delete articles.');
      }
    }
  };

  if (loading) return <p>Load article data...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Article</h1>
        <Link href="/admin/create-article" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          + Create New Article
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date Publish</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{article.title}</td>
                <td className="px-6 py-4">{article.authors.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    article.status.toLowerCase() === 'published' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4">{article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID') : '-'}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => router.push(`/admin/edit/${article.slug}`)} className="text-blue-600 hover:underline">Modify</button>
                  <button onClick={() => handleDelete(article.slug)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}