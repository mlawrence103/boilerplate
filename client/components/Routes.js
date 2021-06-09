import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';

import Home from './Home';
import Example from './Example';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <h4>Boilerplate</h4>
          <div id="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        </nav>
        <Switch>
          <Route exxact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
