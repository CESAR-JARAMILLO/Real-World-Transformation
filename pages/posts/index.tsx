import { useEffect, useState } from 'react';
import { getPosts } from '../api/auth';
import { supabase } from '../../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Box, Heading, Text, Button, VStack, Link, Image, Flex, Divider, AspectRatio, useMediaQuery, Badge } from '@chakra-ui/react'

import Banner from '../../components/Banner';

interface Post {
  id: string;
  title: string;
  category: string;
  content: string;
  main_image_url: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [session, setSession] = useState<Session | null>(null);

  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

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
            main_image_url: postData.main_image_url,
            category: postData.category
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
    <VStack>
      <Flex justifyContent="center">
        <Banner title='Blogs' subtitle='Enjoy our collection of blogs from a range of different topics.' />
      </Flex>
      <Box mt={isLargerThanMD ? "80px" : "50px"}>
        {posts?.map((post) => (
          <Box bgColor="#214CCE" color="white" key={post.id} p={5} shadow="md" borderWidth={1} borderRadius="md" maxWidth="sm" mt={10}>
            <AspectRatio ratio={16 / 9}>
              <Image src={post.main_image_url} objectFit="cover" borderRadius="md" />
            </AspectRatio>
            <Divider borderWidth={1} mt={4} />
            <Badge mt={3} py={1} px={2} borderRadius={20} variant="solid" colorScheme='whiteAlpha'>{post.category}</Badge>
            <Heading as="h3" size="lg" mt={4}>{post.title}</Heading>
            <Text mt={4}>{post.content}</Text>
            <Button colorScheme="whiteAlpha" as={Link} href={`/posts/${post.id}`} p={6} mt={4}>
              Read More
            </Button>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};

export default Posts;
