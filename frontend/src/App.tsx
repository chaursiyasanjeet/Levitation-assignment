import { FC, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addproduct from "./pages/Addproduct";
import ProductContext from "./components/context/productContext";
import GeneratePdf from "./pages/GeneratePdf";

interface Product {
  productName: string;
  quantity: string;
  rate: string;
}

const App: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const productContextValue = { products, setProducts };

  return (
    <ProductContext.Provider value={productContextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/generate_pdf" element={<GeneratePdf />} />
        </Routes>
      </BrowserRouter>
    </ProductContext.Provider>
  );
};

export default App;
