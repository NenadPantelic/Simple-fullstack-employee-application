import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';

function App() {
  return (
    <div className="container">
      <Home/>
      <Department/>
      <Employee/>
    </div>
  );
}

export default App;
