import React from "react";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <Search />
    </div>
  );
}

export default App;

//Remember to wrap app with <BrowserRouter> or <Router>
