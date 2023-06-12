import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const user  = useUser();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log('Error signing in:', error.message);
    } else {
      console.log('User signed in successfully:', data.user);
    }

    setEmail('');
    setPassword('');
  };

  // Redirect if user is already logged in
  if (user) {
    // Perform your redirect logic here
    console.log('User is already logged in:', user.email);
    // return null; // or render a different component if needed
  } else if (!user) {
    console.log('Mo user logged in')
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
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
