import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Box, Heading, Text, Button, VStack, Link, Image, Flex, Divider, AspectRatio, useMediaQuery, Badge } from '@chakra-ui/react'

import Banner from '../../components/Banner';
import {SearchPosts} from '../../components/SearchPosts'
import { getPosts } from '../api/auth';

interface Post {
  id: string;
  slug: string;
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

  const handleSearch = async (category: string) => {
    const { data: postsData, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category);

    if (error) {
      console.error('Error fetching posts:', error.message);
    }

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
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const postsData = await getPosts();
        const sessionData = await getCurrentSession();

        if (Array.isArray(postsData)) {
          const convertedPosts = postsData.map((postData: any) => ({
            id: postData.id,
            slug: postData.slug,
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
      <SearchPosts onSearch={handleSearch} />
      <Flex justify={'center'} wrap={'wrap'} gap={20} mt={{ md: "50px",  base: "30px" }}>
        {posts?.map((post) => (
          <Box bgColor="#4169E1" color="white" key={post.id} p={5} shadow="md" borderWidth={1} borderRadius="md" maxWidth="sm" mt={10}>
            <AspectRatio ratio={16 / 9}>
              <Image loading='lazy' alt='card-image' src={post.main_image_url} objectFit="cover" borderRadius="md" />
            </AspectRatio>
            <Divider borderWidth={1} mt={4} />
            <Badge mt={3} py={1} px={2} borderRadius={20} variant="solid" colorScheme='whiteAlpha'>{post.category}</Badge>
            <Heading as="h3" size="lg" mt={4}>{post.title}</Heading>
            {/* <Text mt={4}>{post.content}...</Text> */}
            <Button colorScheme="whiteAlpha" as={Link} href={`/blogs/${post.slug}`} py={4} px={8} mt={4}>
              Read
            </Button>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
};

export default Posts;
