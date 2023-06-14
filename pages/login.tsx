import { useState } from 'react';
import { signIn, signOut } from './api/auth'
import { useRouter } from 'next/router';

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

    signIn(email, password)

    setEmail('');
    setPassword('');

    router.push('/posts')
  };

  const handleSignOut = async () => {
    signOut()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default LoginPage;
