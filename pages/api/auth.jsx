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
