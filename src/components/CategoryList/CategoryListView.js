import React from 'react';
import { arrayOf, shape } from 'prop-types';

export function CategoryListView({ categories }) {
  if (categories.length === 0) {
    return null;
  }

  return categories.map((category) => {
    return (
      <article key={category._id}>
        <h1>{category.name}</h1>
      </article>
    );
  });
}

CategoryListView.propTypes = {
  categories: arrayOf(shape({}).isRequired).isRequired,
};
