import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Utils
import { fetchBlogApi } from './utils';

// Components
import { TopBarNav } from './components/TopBarNav';

// Styles
import './App.css';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NewPost } from './pages/NewPost';

function App() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetchBlogApi('/auth', 'POST')
      .then(() => setAuthorized(true))
      .catch(err => {
        setAuthorized(false);
        console.error(err.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <TopBarNav />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login authorized={authorized} setAuthorized={setAuthorized} />
          </Route>
          <Route path="/new">
            <NewPost />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
