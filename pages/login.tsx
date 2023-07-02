import { useState } from 'react';
import { signIn, signOut } from './api/auth';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Heading,
  Center,
  Link
} from '@chakra-ui/react';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { data, error } = await signIn(email, password);
  
    if (error) {
      if (error.message) {
        alert(`Failed to sign in: ${error.message}`);
      }
      return;
    }
  
    setEmail('');
    setPassword('');
  
    router.push('/posts');
  };

  const handleSignOut = async () => {
    signOut()
  }

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box bgColor="#4169E1" borderRadius={20} mt="100px" p={5} py={10} width="sm">
        <Center marginBottom={5}>
          <Heading color="white" size="lg">Login</Heading>
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="email"  mt={10}>
            <Input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              autoComplete="username" 
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
              title="Please enter a valid email address."
              placeholder="Email address"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <FormControl id="password" mt={10} >
            <Input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange} 
              autoComplete="current-password"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
              placeholder="Password"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <Button colorScheme="whiteAlpha" type="submit" width="full" mt={10}>
            Submit
          </Button>
        </form>
        <Center marginTop={5}>
          <Link color="white" href="/signup">Don&apos;t have an account?</Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default LoginPage;
