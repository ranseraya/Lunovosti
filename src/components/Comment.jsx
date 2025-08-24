export default function Comment({ comment }) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center mb-2">
          <p className="font-semibold">{comment.users?.username || 'Anonymous'}</p>
          <p className="text-xs text-gray-500 ml-2">
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>
        <p>{comment.content}</p>
      </div>
    );
  }