import { useEffect, useState } from 'react';
import { getPosts } from './api/auth';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const postsData = await getPosts();
        if (Array.isArray(postsData)) {
          const convertedPosts = postsData.map((postData: any) => ({
            id: postData.id,
            title: postData.title,
            content: postData.paragraph_1.substring(0, 200),
          })) as Post[];
          setPosts(convertedPosts);
        }
      } catch (error: any) {
        console.error('Error fetching posts:', error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;