import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header style={{ backgroundColor: '#f8f9fa', padding: '1rem', marginBottom: '1rem' }}>
    <nav>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
        <li>
          <Link href="/" style={{ textDecoration: 'none', color: '#007bff' }}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/posts" style={{ textDecoration: 'none', color: '#007bff' }}>
            Posts
          </Link>
        </li>
        <li>
          <Link href="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
            Login
          </Link>
        </li>
        <li>
          <Link href="/account" style={{ textDecoration: 'none', color: '#007bff' }}>
            Account
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
