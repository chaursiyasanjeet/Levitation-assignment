import { createContext, Context } from "react";

interface Product {
  productName: string;
  quantity: string;
  rate: string;
}

interface ProductContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const defaultValue: ProductContextProps = {
  products: [],
  setProducts: () => {},
};

const ProductContext: Context<ProductContextProps> =
  createContext(defaultValue);

export default ProductContext;
