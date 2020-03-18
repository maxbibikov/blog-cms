import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// Utils
import { fetchBlogApi } from './utils';

// Styles
import './App.css';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Categories } from './pages/Categories';

function App() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetchBlogApi('/auth', 'POST')
      .then(() => setAuthorized(true))
      .catch((err) => {
        setAuthorized(false);
        console.log(err.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login authorized={authorized} setAuthorized={setAuthorized} />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
