import { useState, ChangeEvent, FormEvent } from 'react';
import { createComment } from '../pages/api/auth'
import { supabase } from '../lib/supabaseClient';

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
      createComment(postId, comment)
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={handleCommentChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
