import React from "react";
import LandingPage from "./components/LandingPage";
import Buscador from "./components/Buscador";
import Recipe from "./components/Recipe";
import Post from "./components/Post";
import { Route, Router, BrowserRouter, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <React.Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Buscador} />
        <Route path="/post" component={Post} />
        <Route path="/recipe/:id" component={Recipe} /> 
    </React.Fragment>
  );
};

export default App;
