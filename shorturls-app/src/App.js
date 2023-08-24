import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import About from "./pages/About";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import LinkUrl from "./pages/Link";
import "./App.css";

import "bulma/css/bulma.min.css";
import "./style.scss";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/:id/detail" element={<Detail />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/:linkUrl" element={<LinkUrl />} />
    </Routes>
  );
}

export default App;
