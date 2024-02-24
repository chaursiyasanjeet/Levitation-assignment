import { FC, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import ProductContext from "./context/productContext";
interface AddProductFormProps {
  setFormStatus: () => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ setFormStatus }) => {
  const [productDetails, setProductDetails] = useState<{
    productName: string;
    quantity: string;
    rate: string;
  }>({ productName: "", quantity: "", rate: "" });

  const { setProducts } = useContext(ProductContext);

  const validateProductDetails = () => {
    const errors: Record<string, string> = {};

    if (!productDetails.productName.trim()) {
      errors.productName = "Product name should not be empty";
    }

    if (Number(productDetails.quantity) <= 0) {
      errors.quantity = "Quantity should be greater than 0";
    }

    if (Number(productDetails.rate) <= 0) {
      errors.rate = "Rate should be greater than 0";
    }

    return errors;
  };

  const handleSumbit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateProductDetails();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
    } else {
      setProducts((prev) => [...prev, productDetails]);
      setFormStatus(true);
      setProductDetails({ productName: "", quantity: "", rate: "" });
    }
  };

  return (
    <div className="container mx-auto bg-yellow-50 py-4 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-1 text-center">
        Add Product Details
      </h1>
      <form className="w-full max-w-sm mx-auto  p-4 rounded-md ">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productname"
          >
            Product name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="productname"
            name="productname"
            value={productDetails.productName}
            onChange={(e) => {
              setProductDetails({
                ...productDetails,
                productName: e.target.value,
              });
            }}
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={productDetails.quantity}
            onChange={(e) => {
              setProductDetails({
                ...productDetails,
                quantity: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rate"
          >
            Rate
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="number"
            id="rate"
            name="rate"
            placeholder="Product Rate"
            value={productDetails.rate}
            onChange={(e) => {
              setProductDetails({
                ...productDetails,
                rate: e.target.value,
              });
            }}
          />
        </div>
        <button
          className="w-full  bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
          onClick={handleSumbit}
        >
          Add Product
        </button>
        <button
          className="w-full mt-2 bg-indigo-400 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            setFormStatus();
          }}
        >
          Cancel
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AddProductForm;
