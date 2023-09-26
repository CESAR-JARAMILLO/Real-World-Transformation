import React, { useEffect, useState } from 'react'
import { checkIfFullAccess } from '../api/auth';
import { useRouter } from 'next/router';
import { Flex, Spinner } from '@chakra-ui/react';

const CreateBlog = () => {
  const router = useRouter();
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function checkAccess() {
      try {
        const fullAccess = await checkIfFullAccess();
        setHasFullAccess(fullAccess);
        if (!hasFullAccess) {
          console.log('No access');
          router.push('/blogs');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    checkAccess();
  }, [hasFullAccess, router]);   

  if(isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <div>CreateBlog</div>
  )
}

export default CreateBlog