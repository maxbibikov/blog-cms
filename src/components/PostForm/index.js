import React, { useState, useEffect } from 'react';
import { string, bool, arrayOf, shape } from 'prop-types';

// Utils
import { fetchBlogApi } from '../../utils';

// Styles
import styles from './PostForm.module.css';
import { Redirect } from 'react-router-dom';

function InputError({ errorMessage }) {
  if (errorMessage) {
    return (
      <p className={styles.input_error}>
        <span role="img" aria-label="error">
          ⚠️
        </span>
        {errorMessage}
      </p>
    );
  }

  return null;
}

export function PostForm({ authorized }) {
  console.log('authorized: ', authorized);
  const [postCreated, setPostCreated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authorized) {
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
    }
  }, [authorized]);
  if (postCreated) {
    return <Redirect to="/" />;
  }

  if (categories.length > 0) {
    return (
      <PostFormView
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

  return null;
}

PostForm.propTypes = {
  authorized: bool.isRequired,
};
// const postSchema = new mongoose.Schema({
//     slug: { type: String, required: true, minlength: 5, maxlength: 70 },
//     title: { type: String, required: true, minlength: 5, maxlength: 50 },
//     description: { type: String, required: true, minlength: 10, maxlength: 300 },
//     text: { type: String, required: true, minlength: 10, maxlength: 3000 },
//     created: { type: Date, default: new Date().toUTCString() },
//     modified: Date,
//     picture: String,
//     published: { type: Boolean, default: false },
//     likes: { type: Number, default: 0 },
//     dislikes: { type: Number, default: 0 },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Category',
//       required: true,
//     },
//   });

function CategorySelect({ categoryList, setCategory }) {
  const onChangeCategory = ({ target }) => {
    setCategory(target.value);
  };
  return (
    <div className={styles.input_field}>
      <label htmlFor="category" className={styles.block_label}>
        Category
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
    </div>
  );
}

export function PostFormView(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [text, setText] = useState(props.text);
  const [publish, setPublish] = useState(props.published);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(props.category);
  const [titleErr, setTitleErr] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [textErr, setTextErr] = useState('');

  const onTextChange = ({ target }) => {
    switch (target.name) {
      case 'title':
        setTitle(target.value);
        break;
      case 'description':
        setDescription(target.value);
        break;
      case 'text':
        setText(target.value);
        break;
      default:
        break;
    }
  };

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

      .catch(err => console.log(err));
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
        console.err('err: ', err);
        props.setPostCreated(false);
      });
  };

  return (
    <section className={styles.post_form}>
      <h1 className={styles.title}>{props.formMode} Post</h1>
      <button onClick={onClickGeneratePost} className={styles.post_example_btn}>
        Generate post
      </button>
      <form>
        {/* TITLE INPUT */}
        <div className={styles.input_field}>
          <label htmlFor="title" className={styles.block_label}>
            Title
          </label>
          <textarea
            id="title"
            name="title"
            value={title}
            onChange={onTextChange}
            className={styles.text_input}
            placeholder="Enter post title"
            maxLength={100}
          />
          {/* ERROR MESSAGE */}
          <InputError errorMessage={titleErr} />
        </div>
        <div className={styles.input_field}>
          <label htmlFor="description" className={styles.block_label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onTextChange}
            className={styles.text_input}
            placeholder="Enter description"
            maxLength={300}
          />
          <InputError errorMessage={descriptionErr} />
        </div>
        <div className={styles.input_field}>
          <label htmlFor="text" className={styles.block_label}>
            Post
          </label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={onTextChange}
            rows="5"
            cols="33"
            className={styles.text_input}
            placeholder="Start writing your post"
            maxLength={3000}
          />
          <InputError errorMessage={textErr} />
        </div>
        {/* SELECT CATEGORY */}
        <CategorySelect
          categoryList={props.categoryList}
          setCategory={setCategory}
        />

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
        <div className={styles.button_container}>
          <button className={styles.submit_btn} onClick={onClickSubmit}>
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

PostFormView.propTypes = {
  title: string,
  description: string,
  text: string,
  published: bool,
  category: string.isRequired,
  categoryList: arrayOf(shape({})).isRequired,
  formMode: string.isRequired,
};

PostFormView.defaultProps = {
  title: '',
  description: '',
  text: '',
  published: true,
  category: '',
};
