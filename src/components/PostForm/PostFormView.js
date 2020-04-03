import React from 'react';
import { string, bool, arrayOf, shape, func } from 'prop-types';
// Components
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

export function PostFormView({
  formMode,
  setRandomPost,
  createPostAsync,
  title,
  setTitle,
  titleErr,
  description,
  setDescription,
  descriptionErr,
  text,
  setText,
  textErr,
  setCategory,
  publish,
  togglePublish,
  categories,
  updatePostAsync,
  deletePost,
}) {
  return (
    <section className={styles.container}>
      <header className={styles.header_container}>
        <h1 className={styles.title}>
          <span role="img" aria-label="writing hand">
            ✍️
          </span>{' '}
          {formMode} Post
        </h1>
        {formMode === 'New' ? (
          <div>
            <SecondaryBtn
              onClick={setRandomPost}
              className={styles.post_example_btn}
            >
              Generate post
            </SecondaryBtn>
          </div>
        ) : null}
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
          rows={5}
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
          rows={10}
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
          rows={20}
        />
      </div>
      {/* SELECT CATEGORY */}
      <div className={styles.row}>
        <CategorySelect categoryList={categories} setCategory={setCategory} />
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
              onClick={togglePublish}
              className={styles.radio_btn}
            />
            <label htmlFor="publish_yes">Published</label>
          </div>
          <div className={styles.radio_group}>
            <input
              id="publish_no"
              name="publish"
              type="radio"
              value={false}
              onClick={togglePublish}
              defaultChecked={!publish}
              className={styles.radio_btn}
            />
            <label htmlFor="publish_no">
              {formMode === 'New' ? 'Later' : 'Unpublish'}
            </label>
          </div>
        </div>
      </div>
      <footer className={styles.controlls}>
        {formMode === 'New' ? (
          <div className={styles.createBtn}>
            <PrimaryBtn onClick={createPostAsync}>Create</PrimaryBtn>
          </div>
        ) : (
          <>
            <div className={styles.updateBtn}>
              <PrimaryBtn onClick={updatePostAsync}>Update</PrimaryBtn>
            </div>
            <div className={styles.deleteBtn}>
              <SecondaryBtn onClick={deletePost}>Delete</SecondaryBtn>
            </div>
          </>
        )}
      </footer>
    </section>
  );
}

PostFormView.propTypes = {
  title: string,
  description: string,
  text: string,
  published: bool,
  category: string.isRequired,
  categories: arrayOf(shape({})).isRequired,
  formMode: string.isRequired,
  createPostAsync: func.isRequired,
  deletePost: func,
};

PostFormView.defaultProps = {
  title: '',
  description: '',
  text: '',
  published: true,
  category: '',
  deletePost: () => {},
};
