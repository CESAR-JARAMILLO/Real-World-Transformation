import { useEffect, useState } from 'react';
import { getPosts } from '../api/auth';
import { supabase } from '../../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Box, Heading, Text, Button, VStack, Link, Image, Flex, Divider, AspectRatio } from '@chakra-ui/react'

interface Post {
  id: string;
  title: string;
  content: string;
  main_image_url: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
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
    async function fetchData() {
      try {
        const postsData = await getPosts();
        const sessionData = await getCurrentSession();

        if (Array.isArray(postsData)) {
          const convertedPosts = postsData.map((postData: any) => ({
            id: postData.id,
            title: postData.title,
            content: postData.paragraph_1.substring(0, 200),
            main_image_url: postData.main_image_url
          })) as Post[];
          setPosts(convertedPosts);
        }

        setSession(sessionData);
      } catch (error: any) {
        console.error('Error fetching posts:', error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <VStack spacing={4}>
      <Flex justifyContent="center">
        <Heading as="h2" size="xl" mt={4} mb={4}>Blogs</Heading>
      </Flex>
      {posts?.map((post) => (
        <Box key={post.id} p={5} shadow="md" borderWidth={1} borderRadius="md" maxWidth="sm">
          <AspectRatio ratio={16 / 9}>
            <Image src={post.main_image_url} objectFit="cover" borderRadius="md" />
          </AspectRatio>
          <Heading as="h3" size="lg" mt={4}>{post.title}</Heading>
          <Text mt={4}>{post.content}</Text>
          <Button as={Link} href={`/posts/${post.id}`} variant="outline" mt={4}>
            Read More
          </Button>
        </Box>
      ))}
      <Divider mt={4} />
    </VStack>
  );
};

export default Posts;
