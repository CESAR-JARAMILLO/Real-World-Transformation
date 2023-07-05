import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPostById } from '../api/auth';
import { Box, Heading, Text, Spinner, VStack, Image, Flex, AspectRatio, Divider } from '@chakra-ui/react';
import Comments from '../../components/Comments';

type Post = {
  id: string;
  title: string;
  paragraph_1: string | null;
  paragraph_2: string | null;
  paragraph_3: string | null;
  paragraph_4: string | null;
  paragraph_5: string | null;
  subtitle_1: string | null;
  subtitle_2: string | null;
  subtitle_3: string | null;
  subtitle_4: string | null;
  subtitle_5: string | null;
  main_image_url: string | null;
  sub_image_url_1: string | null;
  sub_image_url_2: string | null;
  sub_image_url_3: string | null;
  sub_image_url_4: string | null;
  sub_image_url_5: string | null;
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
    <Flex justifyContent="center" alignItems="center" direction="column" mt={5}>
      <Box maxWidth="800px" w="100%" p={5}>
        <Heading as="h1" size="xl" mb={4}>{post.title}</Heading>
        {post.main_image_url && 
          <AspectRatio ratio={16 / 9} mb={5}>
            <Image src={post.main_image_url} objectFit="cover" borderRadius="md" />
          </AspectRatio>}

        {post.subtitle_1 && <Heading as={'h2'} size="lg" mt={4}>{post.subtitle_1}</Heading>}
        {post.paragraph_1 && <Text mt={4}>{post.paragraph_1}</Text>}
        {post.sub_image_url_1 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mt={5} mx="auto">
            <Image src={post.sub_image_url_1} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.subtitle_1 && <Divider mt={5} />}

        {post.subtitle_2 && <Heading as={'h2'} size="lg" mt={4}>{post.subtitle_2}</Heading>}
        {post.paragraph_2 && <Text mt={4}>{post.paragraph_2}</Text>}
        {post.sub_image_url_2 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mt={5} mx="auto">
            <Image src={post.sub_image_url_2} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.subtitle_2 && <Divider mt={5} />}

        {post.subtitle_3 && <Heading as={'h2'} size="lg" mt={4}>{post.subtitle_3}</Heading>}
        {post.paragraph_3 && <Text mt={4}>{post.paragraph_3}</Text>}
        {post.sub_image_url_3 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mt={5} mx="auto">
            <Image src={post.sub_image_url_3} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.subtitle_3 && <Divider mt={5} />}

        {post.subtitle_4 && <Heading as={'h2'} size="lg" mt={4}>{post.subtitle_4}</Heading>}
        {post.paragraph_4 && <Text mt={4}>{post.paragraph_4}</Text>}
        {post.sub_image_url_4 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mt={5} mx="auto">
            <Image src={post.sub_image_url_4} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.subtitle_4 && <Divider mt={5} />}

        {post.subtitle_5 && <Heading as={'h2'} size="lg" mt={4}>{post.subtitle_5}</Heading>}
        {post.paragraph_5 && <Text mt={4}>{post.paragraph_5}</Text>}
        {post.sub_image_url_5 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mt={5} mx="auto">
            <Image src={post.sub_image_url_5} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.subtitle_5 && <Divider mt={5} />}

        <Box mt={5}>
          <Comments postId={post.id} />
        </Box>
      </Box>
    </Flex>
  );
};

export default PostPage;
