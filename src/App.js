import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import ProductView from './components/ProductView/ProductView';
import Checkout from './components/Checkout/Checkout';
import AuthContext from './context/context';
import History from './components/History/History';

function App() {
  const [isLogin, setLogin] = useState(false);
  let routeElement = null;
  useEffect(() => {
    if (localStorage.getItem('loggedIn') == 'true') {
      setLogin(true);
    }
  }, []);
  let loginHandle = () => {
    localStorage.setItem('loggedIn', 'true');
    setLogin(true);
  }
  let logoutHandle = () => {
    localStorage.setItem('loggedIn', 'false');
    setLogin(false);
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLogin, setIsLoggedIn: loginHandle, setIsLoggedOut: logoutHandle }}>
      <div className="app-container">
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          {(!isLogin && localStorage.getItem('loggedIn') !== 'true') ? <Redirect from='*' to='/' /> : null}
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/view" component={ProductView}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/history" component={History}></Route>
          {routeElement}
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
