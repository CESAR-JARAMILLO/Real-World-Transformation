import { useState, ChangeEvent, FormEvent } from 'react';
import { createComment, getCommentsByPostId } from '../pages/api/auth';
import { Box, Button, Textarea, FormControl } from '@chakra-ui/react';

interface CommentFormProps {
  postId: string;
  setComments: (comments: Comment[]) => void;
}

interface Comment {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, setComments }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createComment(postId, comment);
    setComment('');

    // Fetch the updated comments and update the comments state
    try {
      const response = await getCommentsByPostId(postId);
      if (Array.isArray(response)) {
        const commentsData: Comment[] = response.map((commentData: any) => ({
          id: commentData.id,
          comment: commentData.comment,
          post_id: commentData.post_id,
          user_id: commentData.user_id,
          created_at: commentData.created_at,
        }));
        setComments(commentsData);
      }
    } catch (error: any) {
      console.error('Error fetching comments:', error.message);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={5}>
      <FormControl>
        <Textarea value={comment} onChange={handleCommentChange} placeholder="Add a comment" />
      </FormControl>
      <Button type="submit" mt={2}>
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
