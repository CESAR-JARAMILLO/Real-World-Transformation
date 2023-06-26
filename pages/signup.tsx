import { useState } from 'react';
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

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
    setConfirmEmail('');
    setConfirmPassword('');

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
            <Input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              autoComplete="username"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address."
            />
          </FormControl>

          <FormControl id="confirm-email" mt={4}>
            <FormLabel>Confirm Email address</FormLabel>
            <Input 
              type="email" 
              value={confirmEmail} 
              onChange={handleConfirmEmailChange} 
              autoComplete="username"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please confirm your email address."
            />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange} 
              autoComplete="current-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
            />
          </FormControl>

          <FormControl id="confirm-password" mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input 
              type="password" 
              value={confirmPassword} 
              onChange={handleConfirmPasswordChange} 
              autoComplete="current-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Please confirm your password."
            />
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
