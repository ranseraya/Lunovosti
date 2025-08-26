'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticlesTable from '@/components/dashboard/ArticlesTable';

export default function EditorDashboard() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading all articles...</p>;

    const pendingArticles = articles.filter(a => a.status === 'pending_review');
    const otherArticles = articles.filter(a => a.status !== 'pending_review');

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Editor Dashboard</h1>
                <Link href="/dashboard/admin/create-article" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                    + New Article
                </Link>
            </div>

            <div className="mb-8">
                <ArticlesTable articles={pendingArticles} title="Pending Review" />
            </div>
            <div>
                <ArticlesTable articles={otherArticles} title="All Other Articles" />
            </div>
        </div>
    );
}