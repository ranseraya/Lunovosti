import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <div className="space-y-4 mt-6">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}