import { useState, useEffect, SetStateAction } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Heading,
  Center,
  Link,
  VStack,
  Spinner,
  Text,
  FormLabel
} from '@chakra-ui/react';
import { updateUser, getCurrentUser, getCurrentUserProfile, signOut, deleteComments } from './api/auth';
import { deleteUser } from './api/adminAuth';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

import UserAvatar from '@/components/UserAvatar';
import Banner from '@/components/Banner';

const Account = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      const user = await getCurrentUser();
      const userProfile = await getCurrentUserProfile();

      if (user && user.email) {
        setEmail(user.email);
      }

      if (userProfile && userProfile[0]) {
        setFullName(userProfile[0].full_name);
        setUsername(userProfile[0].username);
        setAvatarUrl(userProfile[0].avatar_url);
      } else {
        router.push('/login');
      }
    };

    async function getCurrentSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
        throw error;
      }

      if (data && 'session' in data) {
        setSession(data.session);
      } else {
        setSession(null);
      }
    }

    fetchAndSetUserData();
    getCurrentSession();
  }, [router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(email, fullName, username, avatarUrl);
      setEmail('');
      setFullName('');
      setUsername('');
      alert('Update successful!');
      router.push('/posts');
    } catch (error) {
      alert('Failed to update user info.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const user = await getCurrentUser();
        await deleteComments(user?.id);
        await deleteUser(user?.id);
        alert('Account deleted successfully!');
        signOut();
        router.push('/login');
      } catch (error) {
        alert('Failed to delete account.');
      }
    }
  };

  if (!session) {
    return (
      <VStack mt={10}>
        <Spinner color="blue.500" size="xl" />
        <Text>Loading...</Text>
      </VStack>
    );
  }

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" direction="column">
      <Banner title='Edit Profile' subtitle="Upload a photo and enter or edit your information to let other users get to know you!" />
      <UserAvatar
        uid={user?.id}
        url={avatarUrl}
        size={150}
        onUpload={(url: SetStateAction<string>) => {
          setAvatarUrl(url);
        }}
      />
      <Box bgColor="#4169E1" borderRadius={20} mt="100px" p={5} py={10} width="sm">
        <Center marginBottom={5}>
          <Heading color="white" size="lg">User Information</Heading>
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <Input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              autoComplete="username" 
              placeholder="Email address"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>
          <FormControl id="fullName" mb={4}>
            <Input 
              type="text" 
              value={fullName} 
              onChange={handleFullNameChange} 
              placeholder="Full Name"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>
          <FormControl id="username" mb={4}>
            <Input 
              type="text" 
              value={username} 
              onChange={handleUsernameChange} 
              placeholder="Username"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>
          <Button colorScheme="whiteAlpha" type="submit" width="full" mt={4}>
            Update Profile
          </Button>
          <Button colorScheme="red" onClick={handleDelete} width="full" mt={4}>
            Delete Account
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Account;
