import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Rental from './pages/Rental';
import Cart from './pages/Cart';
import Login from './components/Login';
import Orders from './components/Orders';
import { history } from './store';
import MyHistoryOrders from './pages/MyHistoryOrders';

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
        <Route key='cart' exact path="/cart">
          <Cart />
        </Route>
        <Route key='login' exact path="/login">
          <Login />
        </Route>
        <Route key='myHistoryOrders' exact path="/myOrders">
          <MyHistoryOrders />
        </Route>
        <Route key='Orders' exact path="/orders">
          <Orders />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
