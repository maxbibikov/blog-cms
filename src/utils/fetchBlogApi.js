import { getBlogApiUrl } from './getBlogApiUrl';

export function fetchBlogApi(resourcePath, method, body) {
  return fetch(getBlogApiUrl(resourcePath), {
    method,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Access-Control-Request-Headers': '*',
      'Access-Control-Allow-Headers': 'Accept',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then((response) => {
      if (!response.ok) {
        return response
          .json()
          .then((data) => {
            if (data.error) {
              throw Error(data.error);
            }

            throw Error('Connection error');
          })
          .catch((err) => {
            throw Error(err);
          });
      }
      return response
        .json()
        .then((data) => {
          if (data.error) {
            throw Error(data.error);
          }

          return data;
        })
        .catch((err) => {
          throw Error(err);
        });
    })
    .catch((err) => Promise.reject(new Error(err.message)));
}
