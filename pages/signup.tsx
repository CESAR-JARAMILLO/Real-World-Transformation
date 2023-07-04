import { useState } from 'react';
import { signUp } from './api/auth';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Heading,
  Center,
  Link,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | boolean>(false);

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
      setErrorMessage('Emails do not match!');
      return;
    }

    if(password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    signUp(email, password)

    setEmail('');
    setPassword('');
    setConfirmEmail('');
    setConfirmPassword('');

    setErrorMessage(null)
    setSuccessMessage('Sign up successful! Please check your email for a confirmation link.')
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box bgColor="#4169E1" borderRadius={20} mt="100px" p={5} py={10} width="sm">
      {errorMessage && (
          <Alert borderRadius={20} mb={5} status='error'>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert borderRadius={20} mb={5} status='success'>
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        <Center marginBottom={5}>
          <Heading color="white" size="lg">Sign Up</Heading>
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mt={10}>
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

          <FormControl id="confirm-email" mt={10}>
            <Input 
              type="email" 
              value={confirmEmail} 
              onChange={handleConfirmEmailChange} 
              autoComplete="username"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please confirm your email address."
              placeholder="Confirm Email address"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <FormControl id="password" mt={10}>
            <Input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange} 
              autoComplete="current-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
              placeholder="Password"
              border="none"
              borderBottom="1px solid white"
              borderRadius="0"
              color="white"
              _placeholder={{ color: 'white' }}
            />
          </FormControl>

          <FormControl id="confirm-password" mt={10}>
            <Input 
              type="password" 
              value={confirmPassword} 
              onChange={handleConfirmPasswordChange} 
              autoComplete="current-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Please confirm your password."
              placeholder="Confirm Password"
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
          <Link color="white" href="/login">Already have an account?</Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
