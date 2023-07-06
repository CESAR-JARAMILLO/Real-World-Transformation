import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPostBySlug } from '../api/auth';
import { Box, Heading, Text, Spinner, VStack, Image, Flex, AspectRatio, Divider } from '@chakra-ui/react';
import Comments from '../../components/Comments';

type Post = {
  id: string;
  slug: string;
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
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getPostBySlug(slug as string);
  
        if ('id' in postData && 'title' in postData) {
          setPost(postData as Post);
        } else {
          console.error('Received invalid post data:', postData);
        }
  
      } catch (error: any) {
        console.error('Error fetching post:', error.message);
      }
    }
  
    if (slug) {
      fetchPost();
    }
  }, [slug]);
  
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
      <Box maxWidth="650px" w="100%" p={5}>
        <Heading as="h1" size="xl" mb={4}>{post.title}</Heading>
        {post.main_image_url && 
          <AspectRatio ratio={16 / 9} mb={5}>
            <Image src={post.main_image_url} objectFit="cover" borderRadius="md" />
          </AspectRatio>}

        {post.subtitle_1 && <Heading as={'h2'} size="lg" mb={5}>{post.subtitle_1}</Heading>}
        {post.sub_image_url_1 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mx="auto">
            <Image src={post.sub_image_url_1} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.paragraph_1 && <Text lineHeight={1.7} letterSpacing={1} mt={5}>{post.paragraph_1}</Text>}
        {post.subtitle_1 && <Divider my={10} />}

        {post.subtitle_2 && <Heading as={'h2'} size="lg" mb={5}>{post.subtitle_2}</Heading>}
        {post.sub_image_url_2 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mx="auto">
            <Image src={post.sub_image_url_2} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.paragraph_2 && <Text lineHeight={1.7} letterSpacing={1} mt={5}>{post.paragraph_2}</Text>}
        {post.subtitle_2 && <Divider my={10} />}

        {post.subtitle_3 && <Heading as={'h2'} size="lg" mb={5}>{post.subtitle_3}</Heading>}
        {post.sub_image_url_3 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mx="auto">
            <Image src={post.sub_image_url_3} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.paragraph_3 && <Text lineHeight={1.7} letterSpacing={1} mt={5}>{post.paragraph_3}</Text>}
        {post.subtitle_3 && <Divider my={10} />}

        {post.subtitle_4 && <Heading as={'h2'} size="lg" mb={5}>{post.subtitle_4}</Heading>}
        {post.sub_image_url_4 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mx="auto">
            <Image src={post.sub_image_url_4} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.paragraph_4 && <Text lineHeight={1.7} letterSpacing={1} mt={5}>{post.paragraph_4}</Text>}
        {post.subtitle_4 && <Divider my={10} />}

        {post.subtitle_5 && <Heading as={'h2'} size="lg" mb={5}>{post.subtitle_5}</Heading>}
        {post.sub_image_url_5 && 
          <AspectRatio ratio={16 / 9} maxWidth="500px" mx="auto">
            <Image src={post.sub_image_url_5} objectFit="cover" borderRadius="md" />
          </AspectRatio>}
        {post.paragraph_5 && <Text lineHeight={1.7} letterSpacing={1} mt={5}>{post.paragraph_5}</Text>}
        {post.subtitle_5 && <Divider my={10} />}

        <Box mt={5}>
          <Comments postId={post.id} />
        </Box>
      </Box>
    </Flex>
  );
};

export default PostPage;
