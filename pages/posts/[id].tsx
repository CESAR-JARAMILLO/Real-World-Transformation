import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPostById } from '../api/auth';
import { Box, Heading, Text, Spinner, VStack } from '@chakra-ui/react';
import Comments from '../../components/Comments'

type Post = {
  id: string;
  title: string;
  paragraph_1: string | null;
  paragraph_2: string | null;
  paragraph_3: string | null;
  paragraph_4: string | null;
  paragraph_5: string | null;
};

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getPostById(id as string);
  
        if ('id' in postData && 'title' in postData) {
          setPost(postData as Post);
        } else {
          console.error('Received invalid post data:', postData);
        }
  
      } catch (error: any) {
        console.error('Error fetching post:', error.message);
      }
    }
  
    if (id) {
      fetchPost();
    }
  }, [id]);
  
  if (!post) {
    return (
      <VStack mt={10}>
        <Spinner color="blue.500" size="xl" />
        <Text>Loading...</Text>
      </VStack>
    );
  }

  return (
    <Box p={5} shadow="md" borderWidth={1} borderRadius="md">
      <Heading as="h1" size="lg">{post.title}</Heading>
      {post.paragraph_1 && <Text mt={4}>{post.paragraph_1}</Text>}
      {post.paragraph_2 && <Text mt={4}>{post.paragraph_2}</Text>}
      {post.paragraph_3 && <Text mt={4}>{post.paragraph_3}</Text>}
      {post.paragraph_4 && <Text mt={4}>{post.paragraph_4}</Text>}
      {post.paragraph_5 && <Text mt={4}>{post.paragraph_5}</Text>}
      <Box mt={5}>
        <Comments postId={post.id} />
      </Box>
    </Box>
  );
};

export default PostPage;
