import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
// Components
import { PostList } from '../components/PostList';
import { PostPage } from '../pages/PostPage';
// Utils
import { fetchBlogApi } from '../utils/';
import { Loader } from '../components/Loader';

export function HomePage({ authorized, categories }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { path } = useRouteMatch();

  useEffect(() => {
    const loadPosts = () => {
      setLoading(true);
      fetchBlogApi('/posts', 'GET')
        .then((data) => setPosts(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };
    loadPosts();
    return () => {};
  }, []);

  if (loading) {
    return <Loader />;
  }

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

  return (
    <Switch>
      <Route exact path={path}>
        <PostList posts={posts} />
      </Route>
      <Route path="/posts/:postSlug">
        <PostPage
          authorized={authorized}
          categories={categories}
          posts={posts}
        />
      </Route>
    </Switch>
  );
}
