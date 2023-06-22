import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Textarea, FormControl, HStack } from '@chakra-ui/react';

interface EditCommentFormProps {
  comment: Comment;
  handleEdit: (commentId: string, newText: string) => Promise<void>;
  handleCancel: () => void;
}

interface Comment {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

const EditCommentForm: React.FC<EditCommentFormProps> = ({ comment, handleEdit, handleCancel }) => {
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await handleEdit(comment.id, editedComment);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={2}>
      <FormControl>
        <Textarea value={editedComment} onChange={handleCommentChange} resize="vertical" />
      </FormControl>
      <HStack spacing={4} mt={2}>
        <Button type="submit">
          Submit
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default EditCommentForm;
