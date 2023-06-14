import { useEffect, useState } from 'react';
import { getCommentsByPostId } from '../pages/api/auth';
import Comment from './Comment';

interface Comment {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentsData = await getCommentsByPostId(postId);

        if (Array.isArray(commentsData) && commentsData.every(comment => {
          return 'id' in comment && 'comment' in comment && 'post_id' in comment && 'user_id' in comment && 'created_at' in comment;
        })) {
          setComments(commentsData as Comment[]);
        } else {
          console.error('Received invalid comments data:', commentsData);
        }
      } catch (error: any) {
        console.error('Error fetching comments:', error.message);
      }
    }

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  if (!comments) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
