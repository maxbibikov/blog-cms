export const fetchRandomPosts = () => {
  const keywords = ['technology', 'science'];
  const randomNum = Math.round(Math.random() * (keywords.length - 1));
  const key = `5bfcb2ba27ddff91658ac980fee78e7d`;
  const apiUrl = `https://gnews.io/api/v4/top-headlines?&lang=en&max=10&topic=${keywords[randomNum]}&token=${key}`;

  return fetch(apiUrl)
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
