import { BrowserRouter, Route, Routes } from "react-router-dom";

import Pages from "./pages/Pages";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://dishdelight.onrender.com/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipe/*" element={<Pages />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
