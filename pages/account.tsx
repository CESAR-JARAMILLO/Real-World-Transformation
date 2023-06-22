import { useState } from 'react';
import { updateUser } from './api/auth'

const Account = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

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
      alert("Update successful!");
    } catch (error) {
      alert("Failed to update user info.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" value={fullName} onChange={handleFullNameChange} />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Account;
