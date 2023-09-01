import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <Home />
    </div>
  );
}

export default App;

//Remember to wrap app with <BrowserRouter> or <Router>
