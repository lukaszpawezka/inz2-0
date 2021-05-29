import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import About from './pages/About';
import Rental from './pages/Rental';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/rental">
          <Rental />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
