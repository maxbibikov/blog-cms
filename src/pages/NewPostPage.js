import React, { useState } from 'react';
import { bool, arrayOf, shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
// Components
import { PostForm } from '../components/PostForm/';
import { NotAuthorized } from '../components/NotAuthorized/NotAuthorized';
import { Dialog } from '../components/Dialog';
import { Loader } from '../components/Loader';

export function NewPostPage({ authorized, categories }) {
  const [showDialog, setShowDialog] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);
  const [loading, setLoading] = useState(false);

  const successMessage =
    'New post added. In several minutes it will be available at';

  if (!authorized) {
    return <NotAuthorized />;
  }

  if (redirectHome) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loader />;
  }

  if (categories.length > 0) {
    return (
      <>
        <PostForm
          formMode="New"
          categories={categories}
          setShowDialog={setShowDialog}
          category={categories[0]._id}
          loading={loading}
          setLoading={setLoading}
        />
        <Dialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          title="New Post Created"
          actionBtnText="To Posts"
          action={() => setRedirectHome(true)}
        >
          <p>
            {successMessage}{' '}
            <a
              href="https://www.hellowrld.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              hellowrld.tech
            </a>
          </p>
        </Dialog>
      </>
    );
  }

  return null;
}

NewPostPage.propTypes = {
  authorized: bool.isRequired,
  categories: arrayOf(shape({}).isRequired).isRequired,
};
