import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { signOut } from '../pages/api/auth'

const Header = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
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
    }
    
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_OUT') {
        setSession(session)
      } else if (event == 'SIGNED_IN') {
        setSession(session)
      }
    })

    getCurrentSession();
  }, []);

  const handleSignOut = async () => {
    signOut()
  }

  return (
    <header style={{ backgroundColor: '#f8f9fa', padding: '1rem', marginBottom: '1rem' }}>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
          <li>
            <Link href="/" passHref>
              <button style={{ textDecoration: 'none', color: '#007bff', background: 'none', border: 'none' }}>Home</button>
            </Link>
          </li>
          <li>
            <Link href="/posts" passHref>
              <button style={{ textDecoration: 'none', color: '#007bff', background: 'none', border: 'none' }}>Posts</button>
            </Link>
          </li>
          <li>
            <Link href="/account" passHref>
              <button style={{ textDecoration: 'none', color: '#007bff', background: 'none', border: 'none' }}>Account</button>
            </Link>
          </li>
          {session ? (
            <li>
              <Link href="/login" passHref>
                <button onClick={handleSignOut} style={{ textDecoration: 'none', color: '#007bff', background: 'none', border: 'none' }}>Logout</button>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login" passHref>
                <button style={{ textDecoration: 'none', color: '#007bff', background: 'none', border: 'none' }}>Login</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
