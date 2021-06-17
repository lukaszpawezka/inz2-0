import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Orders from './components/Orders';
import About from './pages/About';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Home from './pages/Home';
import MyHistoryOrders from './pages/MyHistoryOrders';
import Product from './pages/Product';
import Rental from './pages/Rental';
import User from './pages/User';
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
        <Route key='User' exact path="/account">
          <User />
        </Route>
        <Route key='Product' exact path="/product">
          <Product />
        </Route>
        <Route key='Category' exact path="/cat">
          <Category />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
