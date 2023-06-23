import { useState, useEffect } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Heading, Center, VStack, Spinner, Text } from '@chakra-ui/react';
import { updateUser, getCurrentUser, getCurrentUserProfile } from './api/auth';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/router';

const Account = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

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
      } else {
        router.push('/login')
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

      setLoading(false);
    }
  
    fetchAndSetUserData();

    getCurrentSession()

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
      await updateUser(email, fullName, username);
      setEmail('');
      setFullName('');
      setUsername('');
      alert('Update successful!');
    } catch (error) {
      alert('Failed to update user info.');
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
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box borderWidth={1} px={4} width="full" maxWidth="500px" borderRadius={4} textAlign="center" boxShadow="lg">
        <Box p={4}>
        <Center marginBottom={5}>
          <Heading size="lg">Edit Profile</Heading>
        </Center>
          <Box as="form" onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl id="fullName" mb={4}>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" value={fullName} onChange={handleFullNameChange} />
            </FormControl>
            <FormControl id="username" mb={4}>
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={handleUsernameChange} />
            </FormControl>
            <Button type="submit" width="full" mt={4}>
              Update Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Account;
