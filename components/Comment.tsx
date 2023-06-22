import { MouseEvent, useState } from 'react';
import { Box, Button, Text, Flex } from '@chakra-ui/react';
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

  const handleCancel = () => {
    setIsEditing(false);
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
    <Box key={comment.id} p={3} shadow="md" borderWidth={1} borderRadius="md" my={3}>
      {isEditing ? (
        <EditCommentForm comment={comment} handleEdit={handleEditSubmit} handleCancel={handleCancel} />
      ) : (
        <>
          <Text mb={2}>{comment.comment}</Text>
          <Text fontSize="sm" color="gray.600">Commented by: {comment.user_id} at {new Date(comment.created_at).toLocaleString()}</Text>
          {showDeleteButton && (
            <Flex mt={2}>
              <Button size="sm" onClick={handleDeleteClick} colorScheme="red" mr={2}>Delete</Button>
              <Button size="sm" onClick={handleEditClick}>Edit</Button>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default Comment;
