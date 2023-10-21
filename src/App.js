import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";


import {Login} from './components/login/Login';
import { Home } from './components/home/Home';

function App() {
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
