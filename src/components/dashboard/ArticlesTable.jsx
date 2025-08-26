'use client';

import { useRouter } from 'next/navigation';

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full capitalize";
  const statusClasses = {
    published: 'bg-green-200 text-green-800',
    draft: 'bg-yellow-200 text-yellow-800',
    pending_review: 'bg-blue-200 text-blue-800',
    archived: 'bg-gray-200 text-gray-800',
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status] || statusClasses.archived}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default function ArticlesTable({ articles, showAuthorColumn = true }) {
  const router = useRouter();

  const handleDelete = async (slug, title) => {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
        try {
            await fetch(`/api/articles/${slug}`, { method: 'DELETE' });
            alert('Article deleted successfully.');
            router.refresh(); 
        } catch (error) {
            alert('Failed to delete article.');
        }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Title</th>
            {showAuthorColumn && <th className="py-3 px-6 text-left">Author</th>}
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Published</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {articles.length > 0 ? (
            articles.map(article => (
              <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{article.title}</td>
                {showAuthorColumn && <td className="py-3 px-6 text-left">{article.authors?.name || 'N/A'}</td>}
                <td className="py-3 px-6 text-center">
                  <StatusBadge status={article.status} />
                </td>
                <td className="py-3 px-6 text-center">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID') : '—'}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center gap-4">
                    <button onClick={() => router.push(`/dashboard/admin/edit/${article.slug}`)} className="text-blue-600 hover:text-blue-800 font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(article.slug, article.title)} className="text-red-600 hover:text-red-800 font-semibold">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showAuthorColumn ? 5 : 4} className="py-4 px-6 text-center text-gray-500">
                No articles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}