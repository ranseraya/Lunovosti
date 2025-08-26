'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Heart, Bookmark } from 'lucide-react';

export default function ArticleActions({ articleId }) {
  const { data: session, status } = useSession();
  const [likeStatus, setLikeStatus] = useState({ count: 0, liked: false });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
        setIsLoading(false);
        return;
    }
    if (status === 'authenticated' && articleId) {
      const fetchStatus = async () => {
        setIsLoading(true);
        try {
          const likeRes = await fetch(`/api/likes?article_id=${articleId}`);
          const likeData = await likeRes.json();
          setLikeStatus(likeData);

          const bookmarkRes = await fetch(`/api/bookmarks?article_id=${articleId}`);
          const bookmarkData = await bookmarkRes.json();
          setIsBookmarked(bookmarkData.bookmarked);
        } catch (error) {
          console.error("Failed to fetch article status:", error);
        } finally {
            setIsLoading(false);
        }
      };
      fetchStatus();
    }
  }, [articleId, status]);

  const handleToggleLike = async () => {
    if (status !== 'authenticated') {
        return alert('Please login to like this article.');
    }
    const originalStatus = { ...likeStatus };
    setLikeStatus(prev => ({
        count: prev.liked ? prev.count - 1 : prev.count + 1,
        liked: !prev.liked,
    }));

    try {
        const response = await fetch('/api/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article_id: articleId }),
        });
        const data = await response.json();
        setLikeStatus({ count: data.count, liked: data.liked });
    } catch (error) {
        console.error("Failed to toggle like:", error);
        setLikeStatus(originalStatus); // Revert on error
    }
  };

  const handleToggleBookmark = async () => {
    if (status !== 'authenticated') {
        return alert('Please login to bookmark this article.');
    }
    const originalBookmark = isBookmarked;
    setIsBookmarked(prev => !prev);
    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article_id: articleId }),
      });
    } catch (error) {
        console.error("Failed to toggle bookmark:", error);
        setIsBookmarked(originalBookmark);
    }
  };

  if (isLoading) {
    return <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>;
  }

  return (
    <div className="flex items-center gap-6 my-6">
      <button onClick={handleToggleLike} className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
        <Heart className={`${likeStatus.liked ? 'text-red-500 fill-current' : ''}`} />
        <span>{likeStatus.count} Likes</span>
      </button>
      <button onClick={handleToggleBookmark} className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
        <Bookmark className={`${isBookmarked ? 'text-blue-500 fill-current' : ''}`} />
        <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>
    </div>
  );
}