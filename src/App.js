import { React } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
// import Admin from "./components/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* Add more routes here when needed */}
      </Routes>
    </BrowserRouter>
  );
};
// done something
export default App;
