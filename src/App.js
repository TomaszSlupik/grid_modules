import "./App.scss";
import Home from "./components/home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loginuser from "./components/loginuser/Loginuser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Loginuser />} />
          <Route path="/module" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
