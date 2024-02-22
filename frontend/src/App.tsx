import { FC } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addproduct from "./pages/Addproduct";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<Addproduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
