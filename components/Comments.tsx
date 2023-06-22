import { useEffect, useState } from 'react';
import { getCommentsByPostId, deleteComment } from '../pages/api/auth';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

import Comment from './Comment';
import CommentForm from './CommentForm';

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
  const [session, setSession] = useState<Session | null>(null);

  async function getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error.message);
      throw error;
    }

    return data ? data.session : null;
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentsData = await getCommentsByPostId(postId);
        const sessionData = await getCurrentSession();

        if (
          Array.isArray(commentsData) &&
          commentsData.every(comment => {
            return (
              'id' in comment &&
              'comment' in comment &&
              'post_id' in comment &&
              'user_id' in comment &&
              'created_at' in comment
            );
          })
        ) {
          setComments(commentsData as Comment[]);
        } else {
          console.error('Received invalid comments data:', commentsData);
        }

        setSession(sessionData);
      } catch (error: any) {
        console.error('Error fetching comments:', error.message);
      }
    }

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(prevComments => {
        if (prevComments === null) {
          return null;
        }
        return prevComments.filter(comment => comment.id !== commentId);
      });
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleSetComments = (newComments: Comment[]) => {
    setComments(newComments);
  };

  if (!comments) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <h2>Comments</h2>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} handleDelete={handleDelete} />
      ))}
      {session && <CommentForm postId={postId} setComments={handleSetComments}  />}
    </div>
  );
};

export default Comments;
