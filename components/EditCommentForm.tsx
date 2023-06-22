import { useState, ChangeEvent, FormEvent } from 'react';

interface EditCommentFormProps {
  comment: Comment;
  handleEdit: (commentId: string, newText: string) => Promise<void>;
}

interface Comment {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

const EditCommentForm: React.FC<EditCommentFormProps> = ({ comment, handleEdit }) => {
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await handleEdit(comment.id, editedComment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={editedComment} onChange={handleCommentChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditCommentForm;
