"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ArticlesTable from "@/components/dashboard/ArticlesTable";

export default function ManageArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const filteredArticles = articles.filter((article) => {
    if (filter === "all") return true;
    return article.status === filter;
  });

  if (loading) return <p className="text-center py-10">Loading articles...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Articles</h1>
        <Link
          href="/dashboard/admin/create-article"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          + New Article
        </Link>
      </div>

      <div className="flex gap-2 mb-4 border-b">
        <button
          onClick={() => setFilter("all")}
          className={`py-2 px-4 ${
            filter === "all" ? "border-b-2 border-orange-500 font-semibold" : ""
          }`}
        >
          All ({articles.length})
        </button>
        <button
          onClick={() => setFilter("published")}
          className={`py-2 px-4 ${
            filter === "published"
              ? "border-b-2 border-orange-500 font-semibold"
              : ""
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setFilter("pending_review")}
          className={`py-2 px-4 ${
            filter === "pending_review"
              ? "border-b-2 border-orange-500 font-semibold"
              : ""
          }`}
        >
          Pending Review
        </button>
        <button
          onClick={() => setFilter("draft")}
          className={`py-2 px-4 ${
            filter === "draft"
              ? "border-b-2 border-orange-500 font-semibold"
              : ""
          }`}
        >
          Draft
        </button>
      </div>
      <ArticlesTable articles={filteredArticles} onUpdate={fetchArticles} />
    </div>
  );
}
