import React, { useEffect, useState } from 'react';

// Components
import { CategoryListView } from './CategoryListView';

// Utils
import { fetchBlogApi } from '../../utils';

export function CategoryListController() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchBlogApi('/categories', 'GET')
      .then(data => {
        setCategories(data.categories);
      })
      .catch(err => {
        setError(err.message);
      });

    return () => {};
  }, []);

  if (error) {
    return (
      <section>
        <h3>
          <span role="img" aria-labelledby="error">
            ⚠️
          </span>
          Error!
        </h3>
        <p>{error}</p>
      </section>
    );
  }

  if (categories.length > 0) {
    return <CategoryListView categories={categories} />;
  }

  return null;
}
