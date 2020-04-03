import React, { useState, useEffect } from 'react';
// Components
import { PostFormView } from './PostFormView';
// Utils
import { fetchRandomPosts, fetchBlogApi } from '../../utils';

export function PostFormControl(props) {
  const [randomPosts, setRandomPosts] = useState([]);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [text, setText] = useState(props.text);
  const [publish, setPublish] = useState(true);
  const [category, setCategory] = useState('');
  const [titleErr, setTitleErr] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [textErr, setTextErr] = useState('');

  useEffect(() => {
    fetchRandomPosts()
      .then(randomPosts => {
        setRandomPosts(randomPosts);
      })
      .catch(err => console.error(err));

    return () => {};
  }, []);

  const createPostAsync = () => {
    return fetchBlogApi('/posts', 'POST', {
      title,
      description,
      text,
      published: publish,
      category: props.categories[0]._id,
    })
      .then(data => {
        if (data.errors) {
          const errorMsg = data.errors[0].msg;
          switch (data.errors[0]) {
            case 'title':
              setTitleErr(errorMsg);
              break;
            case 'description':
              setDescriptionErr(errorMsg);
              break;
            case 'text':
              setTextErr(errorMsg);
              break;
            default:
              console.error(errorMsg);
              break;
          }
        } else {
          props.setPostCreated(true);
        }
      })
      .catch(err => {
        props.setPostCreated(false);
        console.error('err: ', err);
      });
  };
  const updatePostAsync = () => {
    return fetchBlogApi(`/posts/${props.postSlug}`, 'PUT', {
      title,
      description,
      text,
      published: publish,
      category: props.categories[0]._id,
    })
      .then(data => {
        if (data.error) {
          return console.error(data.error);
        }
        if (data.errors) {
          const errorMsg = data.errors[0].msg;
          switch (data.errors[0].param) {
            case 'title':
              setTitleErr(errorMsg);
              break;
            case 'description':
              setDescriptionErr(errorMsg);
              break;
            case 'text':
              setTextErr(errorMsg);
              break;
            default:
              console.error(errorMsg);
              break;
          }
        } else {
          props.setPostUpdated(true);
        }
      })
      .catch(err => {
        props.setPostUpdated(false);
        console.error('err: ', err);
      });
  };

  const setRandomPost = () => {
    if (randomPosts.length > 0) {
      const randomArticle = Math.round(
        Math.random() * (randomPosts.length - 1)
      );
      const article = randomPosts[randomArticle];

      let newTitle = '';
      if (article.title) {
        if (article.title.length > 100) {
          newTitle = article.title.substring(0, 99);
        } else {
          newTitle = article.title;
        }
      }

      setTitle(newTitle.replace(/[^a-zA-Z\d\s]/gi, ''));
      setDescription(article.description || '');
      setText(article.content || '');
    }
  };

  const togglePublish = ({ target }) => {
    if (target.value) {
      setPublish(true);
    } else {
      setPublish(false);
    }
  };

  return (
    <PostFormView
      formMode={props.formMode}
      setRandomPost={setRandomPost}
      createPostAsync={createPostAsync}
      updatePostAsync={updatePostAsync}
      title={title}
      setTitle={setTitle}
      titleErr={titleErr}
      description={description}
      setDescription={setDescription}
      descriptionErr={descriptionErr}
      text={text}
      setText={setText}
      textErr={textErr}
      publish={publish}
      togglePublish={togglePublish}
      category={category}
      setCategory={setCategory}
      categories={props.categories}
      deletePost={props.deletePost}
    />
  );
}
