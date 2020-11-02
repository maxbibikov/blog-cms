import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
// Components
import styles from './PostPage.module.css';
import { PostForm } from '../components/PostForm/';
import { NotAuthorized } from '../components/NotAuthorized/NotAuthorized';
import { Dialog } from '../components/Dialog';

// Utils
import { fetchBlogApi } from '../utils';
import { Loader } from '../components/Loader';

export function PostPage({ posts, categories, authorized }) {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showDialogDeleted, setShowDialogDeleted] = useState(false);
  const [showDialogUpdated, setShowDialogUpdated] = useState(false);
  const { postSlug } = useParams();

  const postData = posts.find((post) => post.slug === postSlug);
  const deletePost = () => {
    setShowDialogDeleted(true);
  };

  const deletePostAsync = () => {
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
    return <Redirect to="/" />;
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
          deletePost={deletePost}
          picture={postData.picture}
          setLoading={setLoading}
          setShowDialogUpdated={setShowDialogUpdated}
        />
      )}

      <Dialog
        showDialog={showDialogDeleted}
        setShowDialog={setShowDialogDeleted}
        className={styles.modal}
        title="Delete Post?"
        action={deletePostAsync}
        actionBtnText="DELETE"
      />
      <Dialog
        showDialog={showDialogUpdated}
        setShowDialog={setShowDialogUpdated}
        className={styles.modal}
        title="Post Updated"
        action={() => {
          window.open(`https://www.hellowrld.tech/${postSlug}`, '_blank');
        }}
        actionBtnText="Visit"
      >
        <p>
          In several minutes changes will apply at{' '}
          <a
            href={`https://www.hellowrld.tech/${postSlug}`}
          >{`hellowrld.tech`}</a>
        </p>
      </Dialog>
    </section>
  );
}
