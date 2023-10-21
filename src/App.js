import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";


import { Banks } from './components/Banks/Banks';
import {Login} from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
