"use client";

import { useState, useEffect } from "react";
import {
  Newspaper,
  Users,
  MailCheck,
  Heart,
  Edit,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const StatCard = ({ title, value, icon, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

const QuickActionButton = ({ title, href, icon, description }) => {
  const Icon = icon;
  return (
    <Link
      href={href}
      className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-gray-50 transition-colors"
    >
      <div className="p-3 rounded-full bg-gray-100 text-orange-500">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Articles"
          value={stats?.totalArticles ?? 0}
          icon={Newspaper}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Articles Pending Review"
          value={stats?.pendingArticles ?? 0}
          icon={MailCheck}
          color="bg-yellow-500"
        />
        <StatCard
          title="Total Likes"
          value={stats?.totalLikes ?? 0}
          icon={Heart}
          color="bg-red-500"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionButton
            title="Write New Article"
            description="Create and publish new content."
            href="/dashboard/admin/create-article"
            icon={Edit}
          />
          <QuickActionButton
            title="Review Submissions"
            description="Approve or reject articles from authors."
            href="/dashboard/admin/articles?filter=pending_review"
            icon={MailCheck}
          />
          <QuickActionButton
            title="Manage Users"
            description="Edit roles and permissions."
            href="/dashboard/admin/users"
            icon={UserPlus}
          />
        </div>
      </div>
    </div>
  );
}
