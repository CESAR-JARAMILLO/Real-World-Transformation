import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { signUp } from './api/auth';
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

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state for password confirmation
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState(''); // Added state for email confirmation

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(email !== confirmEmail) {
      alert('Emails do not match!');
      return;
    }

    if(password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    signUp(email, password)

    setEmail('');
    setPassword('');
    setConfirmEmail(''); // Clear confirmation email
    setConfirmPassword(''); // Clear confirmation password

    alert('Sign up successful! Please check your email for a confirmation link.')
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={5} shadow="md" borderWidth={1} borderRadius="md" width="sm">
        <Center marginBottom={5}>
          <Heading size="lg">Sign Up</Heading>
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} autoComplete="username" />
          </FormControl>

          <FormControl id="confirm-email" mt={4}> {/* Added email confirmation */}
            <FormLabel>Confirm Email address</FormLabel>
            <Input type="email" value={confirmEmail} onChange={handleConfirmEmailChange} autoComplete="username" />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} autoComplete="current-password" />
          </FormControl>

          <FormControl id="confirm-password" mt={4}> {/* Added password confirmation */}
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} autoComplete="current-password" />
          </FormControl>

          <Button type="submit" width="full" mt={4}>
            Submit
          </Button>
        </form>
        <Center marginTop={5}>
          <Link href="/login">Already have an account?</Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
