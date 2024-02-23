import { FC, useState, useContext } from "react";
import logo from "../assets/logo.png";
import AddProductForm from "../components/AddProductForm";
import { ToastContainer, toast } from "react-toastify";
import ProductContext from "../components/context/productContext";
import { useNavigate } from "react-router-dom";

interface Product {
  productName: string;
  rate: string;
  quantity: string;
}

const Addproduct: FC = () => {
  const [popupForm, setPopupForm] = useState<boolean>(false);

  const { products } = useContext(ProductContext);

  const setPopupStatusFromChild = (sucess: boolean): void => {
    setPopupForm(false);
    if (sucess) {
      toast.success("Product Added");
    }
  };

  const redirect = useNavigate();

  const handleGeneratePdfRoute = () => {
    if (products.length === 0) {
      toast.error("Add at least 1 Product");
    } else {
      redirect("/generate_pdf");
    }
  };
  return (
    <section className="py-3 h-screen w-screen bg-violet-100 flex justify-center">
      <div
        className={`w-full  mb-12  px-4 mx-auto mt-1 ${
          popupForm ? "blur-sm" : ""
        }`}
      >
        <img
          src={logo}
          alt="logo_website"
          className="w-40 mx-auto self-center mb-3"
        />
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-5/6">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-screen px-4 max-w-screen flex-grow flex-1">
                <h3 className="font-bold text-2xl text-blueGray-700">
                  Invoice Genrator
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 md:w-1/4 h-10 text-white text-xs md:text-md active:bg-indigo-600  font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setPopupForm(true);
                  }}
                >
                  + Add Item
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s  border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Product
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s  border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Quantity
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s  border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Rate
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s  border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    GST
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((item: Product, index: number) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {item.productName}
                      </th>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.quantity}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.rate}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        INR {(0.18 * item.rate * item.quantity).toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        INR{" "}
                        {(
                          0.18 * item.rate * item.quantity +
                          item.rate * item.quantity
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-2xl font-bold">
                      No Product
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 shadow-2xl ${
          popupForm ? "" : "hidden"
        }`}
      >
        <AddProductForm setFormStatus={setPopupStatusFromChild} />
      </div>
      <button
        className="absolute bottom-5  bg-blue-700 text-white text-2xl font-bold px-2 text-center w-1/4 h-10 rounded-xl"
        onClick={handleGeneratePdfRoute}
      >
        Next
      </button>
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
    </section>
  );
};

export default Addproduct;
