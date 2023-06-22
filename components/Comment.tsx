import { MouseEvent, useState } from 'react';
import EditCommentForm from './EditCommentForm';

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
  handleEdit: (commentId: string, newText: string) => Promise<void>;
  loggedInUserId: string;
}

const Comment: React.FC<CommentProps> = ({ comment, handleDelete, handleEdit, loggedInUserId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await handleDelete(comment.id);
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
    }
  };
  
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditing(true);
  };
  
  const handleEditSubmit = async (commentId: string, newText: string) => {
    try {
      await handleEdit(commentId, newText);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error editing comment:', error.message);
    }
  };

  const showDeleteButton = loggedInUserId === comment.user_id;

  return (
    <div key={comment.id}>
      {isEditing ? (
        <EditCommentForm comment={comment} handleEdit={handleEditSubmit} />
      ) : (
        <>
          <p>{comment.comment}</p>
          <small>Commented by: {comment.user_id} at {new Date(comment.created_at).toLocaleString()}</small>
          {showDeleteButton && (
            <>
              <button onClick={handleDeleteClick}>Delete</button>
              <button onClick={handleEditClick}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
