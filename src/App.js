import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Utils
import { fetchBlogApi } from './utils';

// Components
import { TopBarNav } from './components/TopBarNav';

// Styles
import './App.css';

// Pages
import { Home } from './pages/HomePage';
import { Login } from './pages/LoginPage';
import { NewPost } from './pages/NewPostPage';

export const AuthContext = React.createContext(false);

function App() {
  const [authorized, setAuthorized] = useState(false);

  function authorize() {
    fetchBlogApi('/auth', 'POST')
      .then(data => {
        if (data.error) {
          return setAuthorized(false);
        }
        return setAuthorized(true);
      })
      .catch(err => {
        setAuthorized(false);
        console.error('err: ', err);
      });
  }

  useEffect(() => {
    authorize();
  }, []);

  return (
    <BrowserRouter>
      <TopBarNav />
      <main>
        <AuthContext.Provider value={authorized}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login authorized={authorized} setAuthorized={setAuthorized} />
            </Route>
            <Route authorized={authorized} path="/new">
              <NewPost />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </main>
    </BrowserRouter>
  );
}

export default App;
