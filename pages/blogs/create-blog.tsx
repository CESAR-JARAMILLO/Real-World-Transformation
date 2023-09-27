import React, { useEffect, useState } from 'react'
import { checkIfFullAccess } from '../api/auth';
import { useRouter } from 'next/router';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import CreateBlogForm from '@/components/CreateBlogForm';

const CreateBlog = () => {
  const router = useRouter();
  const [hasFullAccess, setHasFullAccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      try {
        const fullAccess = await checkIfFullAccess();
        setHasFullAccess(fullAccess);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    checkAccess();
  }, [router]);

  useEffect(() => {
    if (hasFullAccess === null) {
    } else if (!hasFullAccess) {
      console.log('No access');
      router.push('/blogs');
    } else {
      setIsLoading(false);
    }
  }, [hasFullAccess, router]);

  if(isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <>
      {hasFullAccess && (
        <Flex flexDir={'column'} justify={'center'} align={'center'}>
          <Heading as='h2'>Create Blog</Heading>
          <CreateBlogForm />
        </Flex>
      )}
    </>
  )
}

export default CreateBlog;
