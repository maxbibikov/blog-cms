import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Components
import { MainNav } from './components/MainNav/MainNav';
import { fetchBlogApi } from './utils';
import './App.css';
// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NewPostPage } from './pages/NewPostPage';
import { UserPage } from './pages/UserPage';

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    function authorize() {
      fetchBlogApi('/auth', 'POST')
        .then((data) => {
          if (data.error) {
            return setAuthorized(false);
          }
          setUser(data);
          return setAuthorized(true);
        })
        .catch((err) => {
          setAuthorized(false);
          console.error('err: ', err);
        })
        .finally(() => setLoading(false));
    }
    authorize();
    return () => {};
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchBlogApi('/categories', 'GET')
      .then(({ categories }) => {
        setCategories(categories);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {};
  }, []);

  const logoutAsync = () => {
    setLoading(true);
    return fetchBlogApi('/auth/logout', 'POST')
      .then((data) => {
        if (data.ok) {
          setAuthorized(false);
        }
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <BrowserRouter>
      <MainNav authorized={authorized} />
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/posts" />
          </Route>
          <Route path="/posts">
            <HomePage authorized={authorized} categories={categories} />
          </Route>
          <Route path="/new">
            <NewPostPage authorized={authorized} categories={categories} />
          </Route>
          <Route path="/login">
            <LoginPage
              user={user}
              setUser={setUser}
              authorized={authorized}
              setAuthorized={setAuthorized}
              loading={loading}
              setLoading={setLoading}
            />
          </Route>
          <Route path="/user">
            <UserPage
              user={user}
              authorized={authorized}
              logoutAsync={logoutAsync}
              loading={loading}
            />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
