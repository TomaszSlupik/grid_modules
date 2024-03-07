import "./App.scss";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginuser from "./components/loginuser/Loginuser";
import Flag from "./components/Flag/Flag";
import Log from "./components/log/Log";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Loginuser />} />
          <Route path="/module" element={<Home />}></Route>
          <Route path="/flag" element={<Flag />}></Route>
          <Route path="/log" element={<Log />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
