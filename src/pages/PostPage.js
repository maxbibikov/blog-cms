import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
// Components
import styles from './PostPage.module.css';
import { PostForm } from '../components/PostForm/';
import { NotAuthorized } from '../components/NotAuthorized/NotAuthorized';

// Utils
import { fetchBlogApi } from '../utils';
import { Loader } from '../components/Loader';

export function PostPage({ posts, categories, authorized }) {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [postUpdated, setPostUpdated] = useState(false);
  const { postSlug } = useParams();

  const postData = posts.find((post) => post.slug === postSlug);
  const deletePost = () => {
    setLoading(true);
    fetchBlogApi(`/posts/${postSlug}`, 'DELETE')
      .then(() => {
        setDeleted(true);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  if (!authorized) {
    return <NotAuthorized />;
  }

  if (loading) {
    return <Loader />;
  }

  if (deleted) {
    return <Redirect to="/posts" />;
  }

  if (postUpdated) {
    return <Redirect to="/posts" />;
  }

  return (
    <section className={styles.container}>
      {postData && Object.keys(postData).length > 0 && (
        <PostForm
          formMode="Update"
          title={postData.title}
          description={postData.description}
          text={postData.text}
          categories={categories}
          postSlug={postSlug}
          setPostUpdated={setPostUpdated}
          deletePost={deletePost}
        />
      )}
    </section>
  );
}
