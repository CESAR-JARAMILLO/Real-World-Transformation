import { supabase } from '../../lib/supabaseClient';

export async function signIn(email, password) {
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

export async function signOut() {
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

export async function signUp(email, password, first_name) {
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

export async function getPosts() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select();

    if (error) {
      console.log('Error retrieving posts:', error.message);
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error retrieving posts:', error.message);
  }
}

export async function getPostById(id) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Error retrieving post');
    }

    return data;
  } catch (error) {
    console.error('Error retrieving post:', error.message);
    throw error;
  }
}

export async function getCommentsByPostId(postId) {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId);

    if (error) {
      console.error('Error fetching comments:', error.message);
      throw error;
    }

    if (!data) {
      console.error('No data returned when fetching comments');
      throw new Error('No data returned when fetching comments');
    }
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    throw error;
  }
}

export async function createComment(postId, comment) {
  try {
    const user = supabase.auth.getUser();

    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([
        { post_id: postId, comment, user_id: user.id },
      ]);

    if (error) {
      console.error('Error creating comment:', error.message);
      throw error;
    } else {
      console.log('Comment created successfully:', data);
      return data;
    }
  } catch (error) {
    console.error('Error creating comment:', error.message);
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    
    if (error) {
      console.error('Error deleting comment:', error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    throw error;
  }
}
