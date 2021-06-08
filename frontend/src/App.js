import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Rental from './pages/Rental';
import { history } from './store';

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route key='about' exact path="/about">
          <About />
        </Route>
        <Route key='rental' exact path="/rental">
          <Rental />
        </Route>
        <Route key='home' exact path="/">
          <Home />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
