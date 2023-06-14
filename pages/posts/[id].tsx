import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPostById } from '../api/auth';

import Comments from '../../components/Comments'

type Post = {
  id: string;
  title: string;
  paragraph_1: string | null;
  paragraph_2: string | null;
  paragraph_3: string | null;
  paragraph_4: string | null;
  paragraph_5: string | null;
};

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getPostById(id as string);
  
        if ('id' in postData && 'title' in postData) {
          setPost(postData as Post);
        } else {
          console.error('Received invalid post data:', postData);
        }
  
      } catch (error: any) {
        console.error('Error fetching post:', error.message);
      }
    }
  
    if (id) {
      fetchPost();
    }
  }, [id]);
  

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      {post.paragraph_1 && <p>{post.paragraph_1}</p>}
      {post.paragraph_2 && <p>{post.paragraph_2}</p>}
      {post.paragraph_3 && <p>{post.paragraph_3}</p>}
      {post.paragraph_4 && <p>{post.paragraph_4}</p>}
      {post.paragraph_5 && <p>{post.paragraph_5}</p>}
      <br />
      <Comments postId={post.id} />
    </div>
  );
  
};

export default PostPage;
