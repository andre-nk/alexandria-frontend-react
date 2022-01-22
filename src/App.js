import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/navigation/NavBar";
import Home from "./pages/index";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar isDynamic={true} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
