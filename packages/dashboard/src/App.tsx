import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersPage from './users/pages/UsersPage';
import Sidebar from './navigation/components/Sidebar';
import theme from './theme';
import FilesPage from './files/FilesPage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Sidebar>
        <Switch>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/files">
            <FilesPage />
          </Route>
        </Switch>
      </Sidebar>
    </Router>
  </ChakraProvider>
);
