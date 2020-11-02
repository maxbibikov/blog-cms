export const fetchRandomPosts = () => {
  const keywords = ['techcrunch', 'ars-technica'];
  const randomNum = Math.round(Math.random() * (keywords.length - 1));

  return fetch(
    `https://newsapi.org/v2/top-headlines?sources=${keywords[randomNum]}&pageSize=20&sortBy=publishedAt&apiKey=a4efcebcbcbc437ba9d11d50605d827d`
  )
    .then((response) => {
      if (response.ok) {
      }
      return response.json();
    })
    .then((data) => {
      if (!data.status === 'error') {
        console.error(data.message);
      }
      return data.articles;
    })

    .catch((err) => console.error(err));
};
