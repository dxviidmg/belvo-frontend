import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import { Login } from "./components/login/Login";
//import { Home } from "./components/home/Home";

function App() {
  return (
    <>
        <Login></Login>
      {/*<BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
  </BrowserRouter>*/}
    </>
  );
}

export default App;
