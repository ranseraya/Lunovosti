'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function FollowButton({ authorId }) {
    const { data: session, status } = useSession();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated' && authorId) {
            const fetchFollowStatus = async () => {
                try {
                    const res = await fetch(`/api/follows?author_id=${authorId}`);
                    const data = await res.json();
                    setIsFollowing(data.following);
                } catch (error) {
                    console.error("Failed to fetch follow status:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFollowStatus();
        } else if (status === 'unauthenticated') {
            setIsLoading(false);
        }
    }, [authorId, status]);

    const handleToggleFollow = async () => {
        if (status !== 'authenticated') {
            return alert('Please login to follow this author.');
        }
        setIsFollowing(prev => !prev);
        try {
            await fetch('/api/follows', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author_id: authorId }),
            });
        } catch (error) {
            console.error("Failed to toggle follow:", error);
            setIsFollowing(prev => !prev);
        }
    };

    if (status !== 'authenticated' || session.user.id === authorId) {
        return null;
    }

    if (isLoading) {
        return <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>;
    }

    return (
        <button
            onClick={handleToggleFollow}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
                isFollowing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
        >
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
}