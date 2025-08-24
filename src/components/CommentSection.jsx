'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default function CommentSection({ articleId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?article_id=${articleId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [articleId]);

  const handleCommentSubmitted = (newComment) => {
    setComments([newComment, ...comments]);
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {session ? (
        <CommentForm articleId={articleId} onCommentSubmitted={handleCommentSubmitted} />
      ) : (
        <p>Please <a href="/login" className="text-orange-500 hover:underline">login</a> to post a comment.</p>
      )}
      <CommentList comments={comments} />
    </div>
  );
}