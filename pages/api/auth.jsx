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

export async function signUp(email, password) {
  try {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
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

export async function getCurrentUser() {
  try {
    const user = (await supabase.auth.getSession()).data.session.user;

    if (!user) {
      console.log('No user currently logged in.');
    } else {
      console.log('Current user:', user);
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error.message);
  }
}

export async function getCurrentUserProfile() {
  try {
    const session = await supabase.auth.getSession();
    if (session.data && session.data.session) {
      const user = session.data.session.user;

      if (!user) {
        console.log('No user currently logged in.');
      } else {
        const { data: userProfile, error } = await supabase.from('profiles').select('*').eq('id', user.id);
        if (error) {
          console.error('Error fetching profile:', error.message);
        } else {
          console.log('User profile:', userProfile);
          return userProfile;
        }
      }
    } else {
      console.log('No session available.');
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
  }
}

export async function updateUser(email, fullName, username) {
  try {
    const { data: authData, error: authError } = await supabase.auth.updateUser({
      email: email,
    });

    if (authError) {
      throw authError;
    }

    const { data: userData, error: userError } = await supabase.from('profiles').update({
      full_name: fullName,
      username: username,
    }).eq('id', authData.user.id);

    if (userError) {
      throw userError;
    }

    return { authData, userData };
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
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

export async function getUsernameFromCommentId(commentId) {
  try {
    // Fetch the comment with the specified ID
    let { data: commentData, error: commentError } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (commentError) throw commentError;

    // Extract the user_id from the comment
    let userId = commentData.user_id;

    // Fetch the user with that ID from the profiles table
    let { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    // Extract and return the username
    return userData.username;
  } catch (error) {
    console.error('Error fetching username:', error.message);
    throw error;
  }
}


export async function createComment(postId, comment) {
  try {
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error retrieving user:', error.message);
      throw error;
    }

    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error: insertError } = await supabase
      .from('comments')
      .insert([
        { post_id: postId, comment, user_id: user.user.id },
      ]);

    if (insertError) {
      console.error('Error creating comment:', insertError.message);
      throw insertError;
    }

    console.log('Comment created successfully:');
    return data;
  } catch (error) {
    console.error('Error creating comment:', error.message);
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error.message);
      throw error;
    }

    console.log('Deleted comment:', commentId);

  } catch (error) {
    console.error('Error deleting comment:', error.message);
    throw error;
  }
}

export async function updateComment(commentId, newText) {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({ comment: newText }) // Change 'text' to 'comment'
      .eq('id', commentId);

    if (error) {
      console.error('Error updating comment:', error.message);
      throw error;
    }

    console.log('Comment updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating comment:', error.message);
    throw error;
  }
}
