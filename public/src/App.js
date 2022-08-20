import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Home } from "./components/Home";
import { Private } from "./components/Private";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/private" element={<Private />} />
      </Routes>
    </div>
  );
}

export default App;
