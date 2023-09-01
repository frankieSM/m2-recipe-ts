import React from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;