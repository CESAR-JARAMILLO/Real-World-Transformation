import { useState } from 'react';
import { signIn, signOut } from './api/auth';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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

    try {
        await signIn(email, password);

        setEmail('');
        setPassword('');

        router.push('/posts');
    } catch (error) {
        alert('Failed to sign in.');
    }
};


  const handleSignOut = async () => {
    signOut()
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={5} shadow="md" borderWidth={1} borderRadius="md" width="sm">
        <Center marginBottom={5}>
          <Heading size="lg">Login</Heading>
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} autoComplete="username" />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} autoComplete="current-password" />
          </FormControl>

          <Button type="submit" width="full" mt={4}>
            Submit
          </Button>
        </form>
        <Center marginTop={5}>
          <Link href="/signup">Don&apos;t have an account?</Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default LoginPage;
