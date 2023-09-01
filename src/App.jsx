import React from "react";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <h1>Recipe App</h1>
      <Search />
      <Category/>
      <Pages/>
      </BrowserRouter>
    </div>
  );
}

export default App;

//Remember to wrap app with <BrowserRouter> or <Router>
