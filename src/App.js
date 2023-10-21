import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login} from './components/login/Login';
import { Home } from './components/home/Home';

function App() {
  return (
    <div className="App">

<>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>

    </div>
  );
}

export default App;
