import React, { useState } from 'react';
import { bool, arrayOf, shape } from 'prop-types';
// Components
import { PostForm } from '../components/PostForm/';
import { NotAuthorized } from '../components/NotAuthorized/NotAuthorized';
import { Dialog } from '../components/Dialog';
import { Loader } from '../components/Loader';

export function NewPostPage({ authorized, categories }) {
  const [showDialogCreated, setShowDialogCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const successMessage =
    'New post added. In several minutes it will be available at';

  if (!authorized) {
    return <NotAuthorized />;
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
          setShowDialogCreated={setShowDialogCreated}
          category={categories[0]._id}
          loading={loading}
          setLoading={setLoading}
        />
        <Dialog
          showDialog={showDialogCreated}
          setShowDialog={setShowDialogCreated}
          title="New Post Created"
          actionBtnText="Visit"
          action={() => {
            window.open('https://www.hellowrld.tech', '_blank');
          }}
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
