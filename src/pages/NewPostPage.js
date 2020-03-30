import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { bool } from 'prop-types';
// Components
import { PostForm } from '../components/PostForm/PostForm.js';
import { NotAuthorized } from '../components/NotAuthorized/NotAuthorized';
import { fetchBlogApi } from '../utils/';

export function NewPostPage({ authorized }) {
  const [postCreated, setPostCreated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBlogApi('/categories', 'GET')
      .then(({ categories }) => {
        setCategories(categories);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (postCreated) {
    return <Redirect to="/" />;
  }

  if (categories && categories.length > 0) {
    return (
      <PostForm
        formMode="New"
        categoryList={categories}
        setPostCreated={setPostCreated}
        category={categories[0]._id}
      />
    );
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!authorized) {
    return <NotAuthorized />;
  }

  return null;
}

NewPostPage.propTypes = {
  authorized: bool.isRequired,
};
