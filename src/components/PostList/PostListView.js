import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, shape } from 'prop-types';

// Components
import styles from './PostList.module.css';

export function PostListView({ posts }) {
  if (posts.length === 0) {
    return null;
  }

  const renderPostList = posts.map(post => {
    const description =
      post.description.length > 130
        ? `${post.description.substring(0, 130)}...`
        : post.description;
    const title =
      post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title;
    return (
      <article className={styles.post} key={post._id}>
        <Link to={`/posts/${post.slug}`}>
          <header>
            <h2 className={styles.postTitle}>{title}</h2>
            <h4 className={styles.descriptionText}>{description}</h4>
          </header>
          <footer className={styles.postFooter}>
            <p>Created: {new Date(post.created).toLocaleString()}</p>
          </footer>
        </Link>
      </article>
    );
  });

  return (
    <section className={styles.container}>
      <h1>Posts</h1>
      <div className={styles.posts}>{renderPostList}</div>
    </section>
  );
}

PostListView.propTypes = {
  posts: arrayOf(shape({}).isRequired).isRequired,
};
