import React, { useEffect, useState } from 'react';

// Utils
import { fetchBlogApi } from '../../utils';

// Components
import { PostListView } from './PostListView';

export function PostListController() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogApi('/posts', 'GET')
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section>
        <h3>
          <span role="img" aria-labelledby="error">
            ⚠️
          </span>
          Error!
        </h3>
        <p>{error}</p>
      </section>
    );
  }

  if (posts.length > 0) {
    return <PostListView posts={posts} />;
  }

  return null;
}
