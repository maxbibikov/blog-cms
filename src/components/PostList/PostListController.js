import React from 'react';
import { arrayOf, shape } from 'prop-types';

// Components
import { PostListView } from './PostListView';

export function PostListController({ posts }) {
  if (posts.length > 0) {
    return <PostListView posts={posts} />;
  }

  return null;
}

PostListController.propTypes = {
  posts: arrayOf(shape({}).isRequired).isRequired,
};
