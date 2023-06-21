import { MouseEvent } from 'react';
import { deleteComment } from '../pages/api/auth';

interface CommentProps {
  comment: {
    id: string;
    comment: string;
    post_id: string;
    user_id: string;
    created_at: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {

  const handleDelete = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await deleteComment(comment.id);
      // Add some code here to remove the deleted comment from your state.
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
    }
  };

  return (
    <div key={comment.id}>
      <p>{comment.comment}</p>
      <small>Commented by: {comment.user_id} at {new Date(comment.created_at).toLocaleString()}</small>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Comment;
