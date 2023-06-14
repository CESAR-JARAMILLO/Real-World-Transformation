import React from 'react';

interface CommentProps {
  comment: {
    id: string;
    comment: string;
    post_id: string;
    user_id: string;
    created_at: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => (
  <div key={comment.id}>
    <p>{comment.comment}</p>
    <small>Commented by: {comment.user_id} at {new Date(comment.created_at).toLocaleString()}</small>
  </div>
)

export default Comment;
