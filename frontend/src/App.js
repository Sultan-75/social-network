import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";
import Alert from "./components/layout/Alert";

// reducers
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Alert />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
