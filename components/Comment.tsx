import { MouseEvent } from 'react';
import { deleteComment } from '../pages/api/auth';

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
}

const Comment: React.FC<CommentProps> = ({ comment, handleDelete }) => {
  const handleDeleteClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await handleDelete(comment.id);
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
    }
  };

  return (
    <div key={comment.id}>
      <p>{comment.comment}</p>
      <small>Commented by: {comment.user_id} at {new Date(comment.created_at).toLocaleString()}</small>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default Comment;
