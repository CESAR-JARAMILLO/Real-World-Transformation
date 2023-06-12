import { supabase } from '../../lib/supabaseClient';

export default async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log('Error signing in:', error.message);
    } else {
      console.log('User signed in successfully:', data.user);
    }
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
}

export default async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('Error signing out:', error.message);
    } else {
      console.log('User signed out successfully');
    }
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
}

export default async function createUser(email, password, first_name) {
  try {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    }, {
      data: {
        first_name: first_name,
      },
    });

    if (error) {
      console.log('Error creating user:', error.message);
    } else {
      console.log('User created successfully:', user);
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}

