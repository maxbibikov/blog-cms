import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, shape } from 'prop-types';

// Components
import styles from './PostList.module.css';

export function PostListView({ posts }) {
  if (posts.length === 0) {
    return null;
  }

  const renderPostList = posts.map((post) => {
    const description =
      post.description.length > 130
        ? `${post.description.substring(0, 130)}...`
        : post.description;
    const title =
      post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title;
    const imgUrl = post.picture || 'https://source.unsplash.com/random/760x380';

    return (
      <article className={styles.post} key={post._id}>
        <Link to={`/posts/${post.slug}`}>
          <header>
            <img src={imgUrl} alt={title} className={styles.postImg} />
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
      <section className={styles.about}>
        <h1>About</h1>
        <p>
          This is content management app for{' '}
          <a
            href="https://www.hellowrld.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            hellowrld.tech
          </a>{' '}
          - blog website.
        </p>
        <p>
          You can <Link to="/new">write</Link> and update existing posts and see
          changes at{' '}
          <a
            href="https://www.hellowrld.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            hellowrld.tech
          </a>{' '}
          in several minutes after new build is complete.
        </p>
      </section>
      <h1>Posts</h1>
      <div className={styles.posts}>{renderPostList}</div>
    </section>
  );
}

PostListView.propTypes = {
  posts: arrayOf(shape({}).isRequired).isRequired,
};
