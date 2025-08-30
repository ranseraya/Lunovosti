"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Send, XCircle, Eye, Archive } from "lucide-react";

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full capitalize";
  const statusClasses = {
    published: "bg-green-200 text-green-800",
    draft: "bg-yellow-200 text-yellow-800",
    pending_review: "bg-blue-200 text-blue-800",
    archived: "bg-gray-200 text-gray-800",
  };
  return (
    <span
      className={`${baseClasses} ${
        statusClasses[status] || statusClasses.archived
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default function ArticlesTable({
  articles,
  showAuthorColumn = true,
  onUpdate,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = session?.user?.role?.toUpperCase();

  const handleStatusChange = async (slug, newStatus, articleTitle) => {
    let reason = "";
    if (newStatus === "pending_review" || newStatus === "draft") {
      reason = window.prompt(
        `Reason for returning "${articleTitle}" to "${newStatus}":`,
        ""
      );
      if (reason === null) return;
    }

    try {
      await fetch(`/api/articles/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, rejection_comment: reason }),
      });
      alert(`Article status changed to ${newStatus}.`);
      onUpdate();
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (slug, title) => {
    if (
      confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      try {
        await fetch(`/api/articles/${slug}`, { method: "DELETE" });
        alert("Article deleted successfully.");
        onUpdate();
      } catch (error) {
        alert("Failed to delete article.");
      }
    }
  };

  const ActionButtons = ({ article }) => {
    switch (article.status) {
      case "pending_review":
        return (
          <>
            <button
              onClick={() =>
                handleStatusChange(article.slug, "published", article.title)
              }
              className="text-green-600 hover:text-green-800 font-semibold"
              title="Approve & Publish"
            >
              <Send className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                handleStatusChange(article.slug, "draft", article.title)
              }
              className="text-red-600 hover:text-red-800 font-semibold"
              title="Reject (Return to Draft)"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </>
        );
      case "published":
        return (
          <>
            <button
              onClick={() =>
                handleStatusChange(article.slug, "draft", article.title)
              }
              className="text-yellow-600 hover:text-yellow-800 font-semibold"
              title="Freeze (Unpublish)"
            >
              <Archive className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                handleStatusChange(
                  article.slug,
                  "pending_review",
                  article.title
                )
              }
              className="text-blue-600 hover:text-blue-800 font-semibold"
              title="Return to Review"
            >
              <Eye className="w-4 h-4" />
            </button>
          </>
        );
      case "draft":
        return (
          <button
            onClick={() =>
              handleStatusChange(article.slug, "published", article.title)
            }
            className="text-green-600 hover:text-green-800 font-semibold"
            title="Approve & Publish"
          >
            <Send className="w-4 h-4" />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Title</th>
            {showAuthorColumn && (
              <th className="py-3 px-6 text-left">Author</th>
            )}
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Published</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {articles.length > 0 ? (
            articles.map((article) => (
              <tr
                key={article.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  {article.title}
                </td>
                {showAuthorColumn && (
                  <td className="py-3 px-6 text-left">
                    {article.authors?.name || "N/A"}
                  </td>
                )}
                <td className="py-3 px-6 text-center">
                  <StatusBadge status={article.status} />
                </td>
                <td className="py-3 px-6 text-center">
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString("id-ID")
                    : "—"}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center gap-4">
                    <ActionButtons article={article} />
                    <button
                      onClick={() =>
                        router.push(`/dashboard/admin/edit/${article.slug}`)
                      }
                      className="text-gray-600 hover:text-gray-800 font-semibold"
                      title="Edit Content"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {userRole === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleDelete(article.slug, article.title)
                        }
                        className="text-red-600 hover:text-red-800 font-semibold"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={showAuthorColumn ? 5 : 4}
                className="py-4 px-6 text-center text-gray-500"
              >
                No articles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
