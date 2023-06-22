import { MouseEvent } from 'react';

interface CommentData {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

interface CommentProps {
  comment: CommentData;
  handleDelete: (commentId: string) => Promise<void>;
  loggedInUserId: string; // Add the ID of the logged-in user
}

const Comment: React.FC<CommentProps> = ({ comment, handleDelete, loggedInUserId }) => {
  const handleDeleteClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await handleDelete(comment.id);
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const showDeleteButton = loggedInUserId === comment.user_id; // Compare user IDs

  return (
    <div key={comment.id}>
      <p>{comment.comment}</p>
      <small>Commented by: {comment.user_id} at {new Date(comment.created_at).toLocaleString()}</small>
      {showDeleteButton && (
        <button onClick={handleDeleteClick}>Delete</button>
      )}
    </div>
  );
};

export default Comment;
