"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DashboardClientPage({ articles: initialArticles }) {
  const [articles, setArticles] = useState(initialArticles || []);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async (slug, title) => {
    if (confirm(`Are you sure to delete this article "${title}"?`)) {
      try {
        const response = await fetch(`/api/articles/${slug}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete article from server.");
        }

        setArticles(articles.filter((article) => article.slug !== slug));
        alert("Article successfully deleted!");
      } catch (error) {
        console.error("Error while deleting article:", error);
        alert("An error accoured while deleting the article.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Artikel</h1>
        <div className="flex gap-4">
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin/users"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Manage Users
            </Link>
          )}

          <Link
            href="/admin/create-article"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            + Create new article
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {article.title}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {article.authors?.name || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                        article.status.toLowerCase() === "published"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center gap-4">
                      <button
                        onClick={() =>
                          router.push(`/admin/edit/${article.slug}`)
                        }
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                        aria-label={`Edit ${article.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(article.slug, article.title)
                        }
                        className="text-red-600 hover:text-red-800 font-semibold"
                        aria-label={`Hapus ${article.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center">
                  There are no articles to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
