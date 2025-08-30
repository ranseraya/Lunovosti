"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArticlesTable from "@/components/dashboard/ArticlesTable";

export default function AuthorDashboard() {
  const { data: session, status } = useSession();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard/my-articles")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch articles from API");
          }
          return res.json();
        })
        .then((data) => {
          setArticles(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  if (loading)
    return <p className="text-center py-10">Loading your articles...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Articles</h1>
        <Link
          href="/dashboard/admin/create-article"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          + New Article
        </Link>
      </div>

      <ArticlesTable articles={articles} showAuthorColumn={false} />
    </div>
  );
}
