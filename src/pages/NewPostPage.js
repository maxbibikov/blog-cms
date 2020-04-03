import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { bool, arrayOf, shape } from 'prop-types';
// Components
import { PostForm } from '../components/PostForm/';
import { NotAuthorized } from '../components/NotAuthorized/NotAuthorized';

export function NewPostPage({ authorized, categories }) {
  const [postCreated, setPostCreated] = useState(false);
  if (!authorized) {
    return <NotAuthorized />;
  }

  if (postCreated) {
    return <Redirect to="/" />;
  }

  if (categories.length > 0) {
    return (
      <PostForm
        formMode="New"
        categories={categories}
        setPostCreated={setPostCreated}
        category={categories[0]._id}
      />
    );
  }

  return null;
}

NewPostPage.propTypes = {
  authorized: bool.isRequired,
  categories: arrayOf(shape({}).isRequired).isRequired,
};
