import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';
import {Navigation} from './components/Navigation'

import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        This is React and Web API demo app.
      </h3>
      <h5 className="m-3 d-flex justify-content-center">
        Welcome to the Employee management portal.
      </h5>
      <Navigation/>
      <Switch>
        <Route path ='/' component={Home} exact />
        <Route path ='/department' component={Department} />
        <Route path ='/employee' component={Employee} /> 
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
