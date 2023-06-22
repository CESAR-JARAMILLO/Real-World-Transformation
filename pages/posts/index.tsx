import { useEffect, useState } from 'react';
import { getPosts } from '../api/auth';
import { supabase } from '../../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
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
      <Heading as="h2" size="xl" mt={4} mb={4}>Blogs</Heading>
      {posts?.map((post) => (
        <Box key={post.id} p={5} shadow="md" borderWidth={1} borderRadius="md" width="sm">
          <Heading as="h3" size="lg">{post.title}</Heading>
          <Text mt={4}>{post.content}</Text>
          <Button as={Link} href={`/posts/${post.id}`} variant="outline" mt={4}>
            Read More
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default Posts;
