import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import NavBar from './NavBar';
import MainRouter from './MainRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container-fluid">
        <MainRouter />
        </div>
      </div>
    </Router>
  );
}