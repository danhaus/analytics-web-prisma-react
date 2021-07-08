import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import UsersPage from './users/pages/UsersPage';
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <ColorModeSwitcher/>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/users">
          <UsersPage />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
);
