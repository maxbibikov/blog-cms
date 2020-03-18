import React from 'react';
import { arrayOf, shape } from 'prop-types';

// Styles
import './PostList.module.css';

export function PostListView({ posts }) {
  if (posts.length === 0) {
    return null;
  }

  const renderPostList = posts.map((post) => {
    return (
      <article key={post._id}>
        <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        <p>{post.body}</p>
      </article>
    );
  });

  return renderPostList;
}

PostListView.propTypes = {
  posts: arrayOf(shape({}).isRequired).isRequired,
};
