import { BrowserRouter } from "react-router-dom";
import Search from "./pages/Search";
import Category from "./components/Category";
import Pages from "./pages/Pages";

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <BrowserRouter>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
