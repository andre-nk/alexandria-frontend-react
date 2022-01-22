import { BrowserRouter } from "react-router-dom";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </div>
  );
}

export default App;
