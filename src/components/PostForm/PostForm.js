import React, { useState, useEffect } from 'react';
import { string, bool, arrayOf, shape } from 'prop-types';
// Components
import { fetchBlogApi } from '../../utils';
import { TextareaInput } from '../TextareaInput/TextareaInput';
import { PrimaryBtn, SecondaryBtn } from '../Buttons';
// Styles
import styles from './PostForm.module.css';

// CategorySelect Component
function CategorySelect({ categoryList, setCategory }) {
  const onChangeCategory = ({ target }) => {
    setCategory(target.value);
  };
  return (
    <>
      <label htmlFor="category" className={styles.select_label}>
        Category:
      </label>
      <select
        id="category"
        name="category"
        className={styles.category_select}
        onChange={onChangeCategory}
      >
        {categoryList.map(category => {
          return <option key={category._id}>{category.name}</option>;
        })}
      </select>
    </>
  );
}

export function PostForm(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [text, setText] = useState(props.text);
  const [publish, setPublish] = useState(props.published);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(props.category);
  const [titleErr, setTitleErr] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [textErr, setTextErr] = useState('');

  useEffect(() => {
    const keywords = ['techcrunch', 'ars-technica', 'bbc-sport'];
    const randomNum = Math.round(Math.random() * (keywords.length - 1));

    fetch(
      `http://newsapi.org/v2/top-headlines?sources=${keywords[randomNum]}&pageSize=20&sortBy=publishedAt&apiKey=a4efcebcbcbc437ba9d11d50605d827d`
    )
      .then(response => {
        if (response.ok) {
        }
        return response.json();
      })
      .then(data => {
        if (!data.status === 'error') {
          console.error(data.message);
        }
        setArticles(data.articles);
      })

      .catch(err => console.error(err));
  }, []);

  const onClickGeneratePost = () => {
    if (articles.length > 0) {
      const randomArticle = Math.round(Math.random() * (articles.length - 1));
      const article = articles[randomArticle];

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

  const onClickPublish = ({ target }) => {
    if (target.value) {
      setPublish(true);
    } else {
      setPublish(false);
    }
  };

  const onClickSubmit = event => {
    event.preventDefault();

    fetchBlogApi('/posts', 'POST', {
      title,
      description,
      text,
      published: publish,
      category,
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
              break;
          }
          return props.setPostCreated(false);
        }
        return props.setPostCreated(true);
      })
      .catch(err => {
        props.setPostCreated(false);
        console.err('err: ', err);
      });
  };

  return (
    <section className={styles.container}>
      <header className={styles.header_container}>
        <h1 className={styles.title}>
          <span role="img" aria-label="writing hand">
            ✍️
          </span>{' '}
          {props.formMode} Post
        </h1>
        <div>
          <SecondaryBtn
            onClick={onClickGeneratePost}
            className={styles.post_example_btn}
          >
            Generate post
          </SecondaryBtn>
        </div>
      </header>
      {/* TITLE INPUT */}
      <div className={styles.row}>
        <TextareaInput
          id="title"
          setValue={setTitle}
          placeholder="Enter post title"
          maxLength={100}
          errorMessage={titleErr}
          value={title}
          label="Title"
        />
      </div>
      {/* DESCRIPTION INPUT */}
      <div className={styles.row}>
        <TextareaInput
          id="description"
          setValue={setDescription}
          placeholder="Enter short description"
          maxLength={300}
          errorMessage={descriptionErr}
          value={description}
          label="Description"
        />
      </div>
      {/* POST INPUT */}
      <div className={styles.row}>
        <TextareaInput
          id="text"
          setValue={setText}
          placeholder="Start writing your post"
          maxLength={3000}
          errorMessage={textErr}
          value={text}
          label="Post"
        />
      </div>
      {/* SELECT CATEGORY */}
      <div className={styles.row}>
        <CategorySelect
          categoryList={props.categoryList}
          setCategory={setCategory}
        />
      </div>
      {/* RADIO GROUP PUBLISH */}
      <div className={styles.row}>
        <p className={styles.radio_caption}>Publish post</p>
        <div className={styles.radio_container}>
          <div className={styles.radio_group}>
            <input
              id="publish_yes"
              name="publish"
              type="radio"
              value={true}
              defaultChecked={publish}
              onClick={onClickPublish}
              className={styles.radio_btn}
            />
            <label htmlFor="publish_yes">Publish</label>
          </div>
          <div className={styles.radio_group}>
            <input
              id="publish_no"
              name="publish"
              type="radio"
              value={false}
              onClick={onClickPublish}
              defaultChecked={!publish}
              className={styles.radio_btn}
            />
            <label htmlFor="publish_no">Later</label>
          </div>
        </div>
      </div>
      <div className={styles.button_container}>
        <PrimaryBtn onClick={onClickSubmit}>Save</PrimaryBtn>
      </div>
    </section>
  );
}

PostForm.propTypes = {
  title: string,
  description: string,
  text: string,
  published: bool,
  category: string.isRequired,
  categoryList: arrayOf(shape({})).isRequired,
  formMode: string.isRequired,
};

PostForm.defaultProps = {
  title: '',
  description: '',
  text: '',
  published: true,
  category: '',
};
