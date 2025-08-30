'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CardItem from '@/components/NewCardItem';
import Link from 'next/link';

export default function BookmarksPage() {
    const { data: session, status } = useSession({ required: true });
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            const fetchBookmarks = async () => {
                try {
                    const res = await fetch('/api/bookmarks');
                    const data = await res.json();
                    setBookmarks(data);
                } catch (error) {
                    console.error("Failed to fetch bookmarks:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchBookmarks();
        }
    }, [status]);

    if (loading || status === 'loading') {
        return <p className="text-center py-10">Loading your bookmarks...</p>;
    }

    return (
        <div className="container mx-auto px-4 my-8">
            <h1 className="text-4xl font-bold border-b-4 border-orange-500 pb-2 mb-6 inline-block">
                My Bookmarks
            </h1>
            {bookmarks.length === 0 ? (
                <p>You haven't bookmarked any articles yet. <Link href="/Home" className="text-orange-500 hover:underline">Explore articles</Link></p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarks.map(({ article }) => (
                        <CardItem
                            key={article.id}
                            title={article.title}
                            date={new Date(article.published_at).toLocaleDateString('id-ID')}
                            tag={article.categories.name}
                            img={article.featured_image_url}
                            url={`/article/${article.slug}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}